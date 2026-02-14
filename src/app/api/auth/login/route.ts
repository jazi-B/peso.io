import { NextRequest, NextResponse } from 'next/server';
import { signToken } from '@/lib/token';
import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Simple in-memory rate limiter
interface RateLimitRecord {
    count: number;
    lastAttempt: number;
}
const rateLimit = new Map<string, RateLimitRecord>();

// Cleanup old records every hour to prevent memory leaks
setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimit.entries()) {
        if (now - record.lastAttempt > 3600000) { // 1 hour
            rateLimit.delete(ip);
        }
    }
}, 3600000); // 1 hour

export async function POST(request: NextRequest) {
    try {
        const { password } = await request.json();

        // Get IP robustly
        const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
        const now = Date.now();
        const windowMs = 60 * 1000; // 1 minute

        // Ensure record exists
        let record = rateLimit.get(ip);
        if (!record) {
            record = { count: 0, lastAttempt: now };
        }

        // Reset if window passed
        if (now - record.lastAttempt > windowMs) {
            record.count = 0;
            record.lastAttempt = now;
        }

        // Check limit
        if (record.count >= 5) {
            return NextResponse.json(
                { error: 'Too many login attempts. Please try again in 1 minute.' },
                { status: 429 }
            );
        }

        // Verify Password
        if (password !== ADMIN_PASSWORD) {
            // Increment verify failure
            record.count += 1;
            record.lastAttempt = now;
            rateLimit.set(ip, record);

            // Artificial delay (300-500ms)
            await new Promise(resolve => setTimeout(resolve, 300));

            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        // Reset on success
        rateLimit.delete(ip);

        const token = await signToken({ role: 'admin' });

        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400, // 1 day
            path: '/',
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
