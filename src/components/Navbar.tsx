import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const Navbar = () => {
    return (
        <nav className="glass" style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            borderBottom: '1px solid var(--border)'
        }}>
            <div className="container flex-between" style={{ height: '70px' }}>
                <Link href="/" className="flex-center" style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)', gap: '10px' }}>
                    <img src="/images/logo.png" alt="Logo" style={{ height: '40px', width: 'auto' }} />
                    <span>{siteConfig.name}</span>
                </Link>
                <div className="flex-center" style={{ gap: '2rem' }}>
                    <Link href="/" className="nav-link">Home</Link>
                    <Link href="/about" className="nav-link">About</Link>
                    <Link href="/services" className="nav-link">Services</Link>
                    <Link href="/contact" className="nav-link">Contact</Link>
                    <Link href="/order" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Book Now</Link>
                </div>
            </div>
        </nav>
    );
};
