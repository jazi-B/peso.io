
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export async function POST() {
    const auth = await isAuthenticated();
    if (!auth) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Raw SQL to truncate and reset auto-increment sequences in PostgreSQL
        await prisma.$executeRawUnsafe('TRUNCATE TABLE "Order" RESTART IDENTITY CASCADE;');
        await prisma.$executeRawUnsafe('TRUNCATE TABLE "ContactQuery" RESTART IDENTITY CASCADE;');

        return NextResponse.json({ success: true, message: 'Database reset and counting started from 1.' });
    } catch (error) {
        console.error('Database reset error:', error);
        return NextResponse.json(
            { error: 'Failed to reset database.' },
            { status: 500 }
        );
    }
}
