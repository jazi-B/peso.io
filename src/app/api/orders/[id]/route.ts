import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const auth = await isAuthenticated();
    if (!auth) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        const body = await request.json();
        const { status } = body;

        if (!['Pending', 'Done', 'Cancelled'].includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        const order = await prisma.order.update({
            where: { id: parseInt(id) },
            data: { status },
        });

        return NextResponse.json(order);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update order.' },
            { status: 500 }
        );
    }
}
