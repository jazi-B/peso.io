
import { Resend } from 'resend';

// Initialize Resend with API Key (we will add this to .env later)
export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOrderEmail = async (order: any) => {
    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY is missing. Email not sent.');
        return;
    }

    try {
        // 1. Send Admin Notification
        await resend.emails.send({
            from: 'Peso Orders <orders@peso.my>',
            to: ['pesopestsolutions@gmail.com'],
            subject: `New Order #${order.id}: ${order.service}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #059669;">New Order Received! 🚀</h1>
                    <p><strong>Service:</strong> ${order.service}</p>
                    <p><strong>Name:</strong> ${order.name}</p>
                    ${order.email ? `<p><strong>Email:</strong> ${order.email}</p>` : ''}
                    <p><strong>Phone:</strong> ${order.contact}</p>
                    <p><strong>Location:</strong> ${order.location}</p>
                    ${order.notes ? `<p><strong>Notes:</strong> ${order.notes}</p>` : ''}
                    <br/>
                    <a href="https://peso.my/admin/dashboard" style="background:#059669;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;display:inline-block;">View in Dashboard</a>
                </div>
            `,
        });

        // 2. Send Customer Confirmation (if email provided)
        if (order.email) {
            await resend.emails.send({
                from: 'Peso Pest Control <info@peso.my>',
                to: [order.email],
                subject: `Order Confirmation #${order.id} - Peso`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                        <h1 style="color: #059669;">Order Confirmed! ✅</h1>
                        <p>Hi ${order.name},</p>
                        <p>Thank you for booking with <strong>Peso Pest Control</strong>. We have received your request for <strong>${order.service}</strong>.</p>
                        <p>Our team will contact you shortly at <strong>${order.contact}</strong> to confirm the appointment details.</p>
                        
                        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <p style="margin: 0;"><strong>Order ID:</strong> #${order.id}</p>
                            <p style="margin: 5px 0 0;"><strong>Service:</strong> ${order.service}</p>
                            <p style="margin: 5px 0 0;"><strong>Location:</strong> ${order.location}</p>
                        </div>

                        <p>If you have any questions, feel free to reply to this email or call us at <strong>+92 333 6218102</strong>.</p>
                        <br/>
                        <p style="color: #6b7280; font-size: 14px;">Best regards,<br/>The Peso Team</p>
                    </div>
                `,
            });
        }

    } catch (error) {
        console.error('Failed to send email:', error);
    }
};
