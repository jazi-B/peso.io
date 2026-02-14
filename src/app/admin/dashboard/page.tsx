
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Order {
    id: number;
    name: string;
    contact: string;
    location: string;
    service: string;
    notes: string | null;
    status: string;
    createdAt: string;
}

interface ContactQuery {
    id: number;
    name: string;
    email: string;
    message: string;
    createdAt: string;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'orders' | 'queries'>('orders');

    // Orders State
    const [orders, setOrders] = useState<Order[]>([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [filter, setFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    // Queries State
    const [queries, setQueries] = useState<ContactQuery[]>([]);
    const [loadingQueries, setLoadingQueries] = useState(true);

    useEffect(() => {
        fetchOrders();
        fetchQueries();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/orders');
            if (res.status === 401) return router.push('/admin/login');
            const data = await res.json();
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders');
        } finally {
            setLoadingOrders(false);
        }
    };

    const fetchQueries = async () => {
        try {
            const res = await fetch('/api/contact');
            if (res.status === 401) return; // Handled by orders fetch usually
            const data = await res.json();
            setQueries(data);
        } catch (error) {
            console.error('Failed to fetch queries');
        } finally {
            setLoadingQueries(false);
        }
    };

    const updateStatus = async (id: number, newStatus: string) => {
        try {
            const res = await fetch(`/api/orders/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) {
                setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
            }
        } catch (error) {
            console.error('Failed to update status');
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.name.toLowerCase().includes(filter.toLowerCase()) ||
            order.contact.includes(filter) ||
            order.location.toLowerCase().includes(filter.toLowerCase());
        const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending': return '#f59e0b'; // Amber
            case 'Done': return '#10b981'; // Emerald
            case 'Cancelled': return '#ef4444'; // Red
            default: return '#6b7280';
        }
    };

    if (loadingOrders && loadingQueries) return <div className="container" style={{ padding: '4rem' }}>Loading...</div>;

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <h1 className="section-title" style={{ fontSize: '2rem', marginBottom: 0, textAlign: 'left' }}>Admin Dashboard</h1>
                <div className="flex-center gap-4">
                    <button onClick={() => { fetchOrders(); fetchQueries(); }} className="btn btn-outline" style={{ fontSize: '0.9rem' }}>Refresh</button>
                    <button
                        onClick={async () => {
                            await fetch('/api/auth/logout', { method: 'POST' });
                            router.push('/admin/login');
                        }}
                        className="btn btn-outline"
                        style={{ fontSize: '0.9rem', borderColor: 'var(--danger)', color: 'var(--danger)' }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
                <button
                    onClick={() => setActiveTab('orders')}
                    style={{
                        padding: '1rem 2rem',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'orders' ? '2px solid var(--primary)' : '2px solid transparent',
                        color: activeTab === 'orders' ? 'var(--primary)' : 'var(--text-muted)',
                        fontWeight: activeTab === 'orders' ? '600' : '400',
                        cursor: 'pointer',
                        fontSize: '1.1rem'
                    }}
                >
                    Orders
                </button>
                <button
                    onClick={() => setActiveTab('queries')}
                    style={{
                        padding: '1rem 2rem',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'queries' ? '2px solid var(--primary)' : '2px solid transparent',
                        color: activeTab === 'queries' ? 'var(--primary)' : 'var(--text-muted)',
                        fontWeight: activeTab === 'queries' ? '600' : '400',
                        cursor: 'pointer',
                        fontSize: '1.1rem'
                    }}
                >
                    Queries ({queries.length})
                </button>
            </div>

            {activeTab === 'orders' ? (
                <>
                    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                        <div className="flex-center" style={{ gap: '1rem', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                            <input
                                className="input"
                                style={{ maxWidth: '300px' }}
                                placeholder="Search orders..."
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            />
                            <select
                                className="input"
                                style={{ maxWidth: '200px' }}
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="All">All Statuses</option>
                                <option value="Pending">Pending</option>
                                <option value="Done">Done</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    <div className="glass-card" style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(0,0,0,0.02)' }}>
                                    <th style={{ padding: '1rem', fontWeight: '600' }}>Order ID</th>
                                    <th style={{ padding: '1rem', fontWeight: '600' }}>Customer</th>
                                    <th style={{ padding: '1rem', fontWeight: '600' }}>Service</th>
                                    <th style={{ padding: '1rem', fontWeight: '600' }}>Location</th>
                                    <th style={{ padding: '1rem', fontWeight: '600' }}>Date</th>
                                    <th style={{ padding: '1rem', fontWeight: '600' }}>Status</th>
                                    <th style={{ padding: '1rem', fontWeight: '600' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                            No orders found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredOrders.map(order => (
                                        <tr key={order.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                            <td style={{ padding: '1rem' }}>#{order.id}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ fontWeight: '500' }}>{order.name}</div>
                                                <div className="text-muted" style={{ fontSize: '0.85rem' }}>{order.contact}</div>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                {order.service}
                                                {order.notes && (
                                                    <div className="text-muted" style={{ fontSize: '0.8rem', maxWidth: '200px', marginTop: '4px' }}>
                                                        Note: {order.notes}
                                                    </div>
                                                )}
                                            </td>
                                            <td style={{ padding: '1rem' }}>{order.location}</td>
                                            <td style={{ padding: '1rem' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: '20px',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '600',
                                                    background: `${getStatusColor(order.status)}20`,
                                                    color: getStatusColor(order.status)
                                                }}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    {order.status !== 'Done' && (
                                                        <button
                                                            onClick={() => updateStatus(order.id, 'Done')}
                                                            className="btn"
                                                            style={{ background: '#dcfce7', color: '#166534', padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}
                                                            title="Mark as Done"
                                                        >
                                                            ✓
                                                        </button>
                                                    )}
                                                    {order.status !== 'Cancelled' && (
                                                        <button
                                                            onClick={() => updateStatus(order.id, 'Cancelled')}
                                                            className="btn"
                                                            style={{ background: '#fee2e2', color: '#991b1b', padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}
                                                            title="Mark as Cancelled"
                                                        >
                                                            ✕
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <div className="glass-card" style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(0,0,0,0.02)' }}>
                                <th style={{ padding: '1rem', fontWeight: '600' }}>Date</th>
                                <th style={{ padding: '1rem', fontWeight: '600' }}>Name</th>
                                <th style={{ padding: '1rem', fontWeight: '600' }}>Email</th>
                                <th style={{ padding: '1rem', fontWeight: '600' }}>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {queries.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                        No queries found.
                                    </td>
                                </tr>
                            ) : (
                                queries.map(query => (
                                    <tr key={query.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '1rem', whiteSpace: 'nowrap' }}>{new Date(query.createdAt).toLocaleDateString()}</td>
                                        <td style={{ padding: '1rem', fontWeight: '500' }}>{query.name}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <a href={`mailto:${query.email}`} style={{ color: 'var(--primary)' }}>{query.email}</a>
                                        </td>
                                        <td style={{ padding: '1rem', maxWidth: '400px' }}>{query.message}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
