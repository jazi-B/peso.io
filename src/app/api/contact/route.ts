
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

// Create Query (Public)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, Email, and Message are required.' },
                { status: 400 }
            );
        }

        const query = await prisma.contactQuery.create({
            data: {
                name,
                email,
                message,
            },
        });

        return NextResponse.json(query, { status: 201 });
    } catch (error) {
        console.error('Contact query error:', error);
        return NextResponse.json(
            { error: 'Failed to send message.' },
            { status: 500 }
        );
    }
}

// List Queries (Admin only)
export async function GET() {
    const auth = await isAuthenticated();
    if (!auth) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const queries = await prisma.contactQuery.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(queries);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch queries.' },
            { status: 500 }
        );
    }
}
