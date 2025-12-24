'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { SERVICES } from '@/lib/constants';

export default function OrderPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        location: '',
        service: '',
        notes: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            setSuccess(true);
            // Reset form usually, or just show success message
            setFormData({ name: '', contact: '', location: '', service: '', notes: '' });

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="container" style={{ padding: '6rem 0', maxWidth: '600px', textAlign: 'center' }}>
                <div className="glass-card animate-fade-in" style={{ padding: '3rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                    <h1 className="section-title" style={{ fontSize: '2rem' }}>Order Placed!</h1>
                    <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
                        Thank you for choosing Peso.io. We will contact you shortly to confirm your appointment.
                    </p>
                    <button
                        onClick={() => setSuccess(false)}
                        className="btn btn-primary"
                    >
                        Place Another Order
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '600px' }}>
            <h1 className="section-title">Book a Service</h1>
            <form onSubmit={handleSubmit} className="glass-card animate-fade-in" style={{ padding: '2rem' }}>

                {error && (
                    <div style={{
                        background: '#fee2e2',
                        color: '#b91c1c',
                        padding: '1rem',
                        borderRadius: '8px',
                        marginBottom: '1.5rem',
                        border: '1px solid #fca5a5'
                    }}>
                        {error}
                    </div>
                )}

                <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                />

                <Input
                    label="Contact Number"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                    placeholder="+92 333 6218102"
                    type="tel"
                />

                <Input
                    label="Location / Address"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="123 Main St, City"
                />

                <Select
                    label="Service Type"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    options={SERVICES}
                />

                <div className="input-group">
                    <label className="label" htmlFor="notes">Additional Notes (Optional)</label>
                    <textarea
                        className="input"
                        name="notes"
                        id="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Any specific instructions..."
                        style={{ resize: 'vertical' }}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: '1rem' }}
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit Order'}
                </button>
            </form>
        </div>
    );
}
