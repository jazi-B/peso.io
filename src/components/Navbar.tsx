'use client';

import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { ThemeToggle } from '@/components/ThemeToggle';

import { useState } from 'react';


export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="glass sticky-nav">
            <div className="container nav-content">
                <Link href="/" className="nav-logo">
                    <img src="/images/logo.png" alt="Logo" className="logo-img" />
                    <span>{siteConfig.name}</span>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <ThemeToggle />

                    {/* Mobile Menu Button */}
                    <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
                        <div className={`hamburger ${isOpen ? 'open' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>

                    {/* Desktop and Mobile Links */}
                    <div className={`nav-links ${isOpen ? 'open' : ''}`}>
                        <Link href="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</Link>
                        <Link href="/about" className="nav-link" onClick={() => setIsOpen(false)}>About</Link>
                        <Link href="/services" className="nav-link" onClick={() => setIsOpen(false)}>Services</Link>
                        <Link href="/contact" className="nav-link" onClick={() => setIsOpen(false)}>Contact</Link>
                        <Link href="/order" className="btn btn-primary nav-cta" onClick={() => setIsOpen(false)}>Book Now</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

