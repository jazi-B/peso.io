import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';
import { SERVICES } from '@/lib/constants';
import { sendOrderEmail } from '@/lib/resend';

// Create Order (Public)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, contact, location, service, notes } = body;

        // Validation
        if (!name || !contact || !location || !service) {
            return NextResponse.json(
                { error: 'Name, Contact, Location, and Service are required.' },
                { status: 400 }
            );
        }

        // Validate service
        // @ts-ignore
        if (!SERVICES.includes(service)) {
            return NextResponse.json(
                { error: 'Invalid service selected.' },
                { status: 400 }
            );
        }

        // Phone validation (simple regex)
        const phoneRegex = /^[0-9+\-\s()]{7,}$/;
        if (!phoneRegex.test(contact)) {
            return NextResponse.json(
                { error: 'Invalid contact number format.' },
                { status: 400 }
            );
        }

        // Prevent duplicate submissions (same contact + same service within last 5 minutes)
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        const existingOrder = await prisma.order.findFirst({
            where: {
                contact,
                service,
                createdAt: {
                    gt: fiveMinutesAgo
                }
            }
        });

        if (existingOrder) {
            return NextResponse.json(
                { error: 'You have already placed a similar order recently.' },
                { status: 429 }
            );
        }

        const order = await prisma.order.create({
            data: {
                name,
                email,
                contact,
                location,
                service,
                notes,
            },
        });

        // Send email notification (fire and forget)
        await sendOrderEmail(order);

        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        console.error('Order creation error:', error);
        // Serverless environments compatible logging
        console.error(JSON.stringify({
            event: 'ERROR_ORDER_CREATION',
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        }));

        return NextResponse.json(
            { error: 'Failed to place order.' },
            { status: 500 }
        );
    }
}

// List Orders (Admin only)
export async function GET() {
    const auth = await isAuthenticated();
    if (!auth) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const orders = await prisma.order.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch orders.' },
            { status: 500 }
        );
    }
}
