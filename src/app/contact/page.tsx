
'use client';

import { useState } from 'react';
import { siteConfig } from '@/config/site';

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setStatus('idle');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error('Failed to send message');
            setStatus('success');
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container section-padding">
            <h1 className="section-title">Contact Us</h1>
            <p className="text-center text-body" style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
                Have questions? We'd love to hear from you. Reach out to us via phone, email, or fill out the form below.
            </p>

            <div className="grid-auto-fit" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                <div className="glass-card animate-fade-in" style={{ padding: '2rem' }}>
                    <h2 className="text-subtitle" style={{ marginBottom: '1.5rem' }}>Send us a Message</h2>

                    {status === 'success' && (
                        <div style={{ background: '#dcfce7', color: '#166534', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                            Message sent successfully! We will get back to you soon.
                        </div>
                    )}

                    {status === 'error' && (
                        <div style={{ background: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                            Failed to send message. Please try again or contact us directly.
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="label">Name</label>
                            <input name="name" type="text" className="input" placeholder="Your Name" required />
                        </div>
                        <div className="input-group">
                            <label className="label">Email</label>
                            <input name="email" type="email" className="input" placeholder="your@email.com" required />
                        </div>
                        <div className="input-group">
                            <label className="label">Message</label>
                            <textarea name="message" className="input" rows={4} placeholder="How can we help?" style={{ resize: 'vertical' }} required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                        <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                            * This form is for inquiries. To book a service, please use the <a href="/order" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Booking Page</a>.
                        </p>
                    </form>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }}>
                    <div className="glass-card flex-center" style={{ padding: '2rem', gap: '1rem', justifyContent: 'flex-start' }}>
                        <div style={{ fontSize: '2rem' }}>📞</div>
                        <div>
                            <h3 className="text-subtitle" style={{ marginBottom: '0.25rem' }}>Phone</h3>
                            <p className="text-body"><a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phone}</a></p>
                        </div>
                    </div>

                    <div className="glass-card flex-center" style={{ padding: '2rem', gap: '1rem', justifyContent: 'flex-start' }}>
                        <div style={{ fontSize: '2rem' }}>💬</div>
                        <div>
                            <h3 className="text-subtitle" style={{ marginBottom: '0.25rem' }}>WhatsApp</h3>
                            <p className="text-body"><a href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank">{siteConfig.contact.whatsapp}</a></p>
                        </div>
                    </div>

                    <div className="glass-card flex-center" style={{ padding: '2rem', gap: '1rem', justifyContent: 'flex-start' }}>
                        <div style={{ fontSize: '2rem' }}>📧</div>
                        <div>
                            <h3 className="text-subtitle" style={{ marginBottom: '0.25rem' }}>Email</h3>
                            <p className="text-body"><a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
