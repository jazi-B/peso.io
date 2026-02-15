
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'peso-pest-secret-key-change-this-in-prod'
);

export async function signToken() {
    return new SignJWT({ admin: true })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h') // Session lasts 24 hours
        .sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload;
    } catch (error) {
        return null;
    }
}

export async function login(password: string) {
    // Check against environment variable password
    // If not set, default to 'admin' (Change this!)
    const correctPassword = process.env.ADMIN_PASSWORD || 'admin';

    if (password !== correctPassword) {
        return false;
    }

    // Create session
    const token = await signToken();

    // Set cookie
    (await cookies()).set('admin_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
    });

    return true;
}

export async function logout() {
    (await cookies()).delete('admin_session');
}

export async function isAuthenticated() {
    const token = (await cookies()).get('admin_session')?.value;
    if (!token) return false;
    return await verifyToken(token) !== null;
}
