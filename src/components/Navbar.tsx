import Link from 'next/link';

export const Navbar = () => {
    return (
        <nav style={{
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--border)',
            position: 'sticky',
            top: 0,
            zIndex: 50
        }}>
            <div className="container" style={{
                height: '70px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Link href="/" style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src="/images/logo.png" alt="Logo" style={{ height: '40px', width: 'auto' }} />
                    <span>Peso<span style={{ color: 'var(--secondary)' }}>.io</span></span>
                </Link>
                <div style={{ display: 'flex', gap: '2rem' }}>
                    <Link href="/" style={{ fontWeight: 500 }}>Home</Link>
                    <Link href="/order" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                        Book Service
                    </Link>
                </div>
            </div>
        </nav>
    );
};
