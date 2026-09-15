'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ReservationDetail {
    name: string;
    phone: string;
    service: string;
    date: string;
    time: string;
}

const Header: React.FC = () => {
    const pathname = usePathname();
    const [hasReservation, setHasReservation] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [reservation, setReservation] = useState<ReservationDetail | null>(null);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const notificationRef = useRef<HTMLDivElement | null>(null);

    // Track reservation events
    useEffect(() => {
        const updateReservationStatus = (event?: Event) => {
            const nextReservation = event instanceof CustomEvent ? event.detail : null;
            setReservation(nextReservation);
            setHasReservation(Boolean(nextReservation));
        };

        window.addEventListener('reservation-created', updateReservationStatus);
        return () => {
            window.removeEventListener('reservation-created', updateReservationStatus);
        };
    }, []);

    // Track scroll position for sticky styling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile nav when pathname changes
    useEffect(() => {
        setIsMobileNavOpen(false);
        setShowNotifications(false);
    }, [pathname]);

    // Handle escape key and prevent body scroll when mobile nav is open
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsMobileNavOpen(false);
                setShowNotifications(false);
            }
        };

        if (isMobileNavOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isMobileNavOpen]);

    // Close notification panel when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
                setShowNotifications(false);
            }
        };

        if (showNotifications) {
            window.addEventListener('click', handleClickOutside);
        }
        return () => window.removeEventListener('click', handleClickOutside);
    }, [showNotifications]);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/treatment', label: 'Treatment', aliases: ['/services'] },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ];

    const isLinkActive = (item: { href: string; aliases?: string[] }) => {
        if (item.href === '/') return pathname === '/';
        if (pathname.startsWith(item.href)) return true;
        if (item.aliases?.some(alias => pathname.startsWith(alias))) return true;
        return false;
    };

    // Do not render public header on admin workspace or admin login
    if (pathname?.startsWith('/admin')) {
        return null;
    }

    return (
        <>
            <header 
                className={`site-header home-site-header ${isScrolled ? 'is-scrolled' : ''}`}
                role="banner"
            >
                <div className="header-inner">
                    {/* Brand Logo */}
                    <Link href="/" className="brand" aria-label="Titis Beauty Aesthetic Home">
                        <img 
                            src="/images/titislogo.jpg" 
                            alt="Titis Beauty Aesthetic" 
                            className="brand-logo" 
                            width="1462" 
                            height="886" 
                        />
                        <div className="brand-text">
                            <strong>TITIS</strong>
                            <small>Beauty Aesthetic</small>
                        </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="main-nav" aria-label="Main navigation">
                        {navLinks.map((link) => {
                            const active = isLinkActive(link);
                            return (
                                <Link 
                                    key={link.href} 
                                    href={link.href}
                                    className={`nav-link ${active ? 'active' : ''}`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Header Actions */}
                    <div className="header-actions">
                        {/* Notification Bell (if has active reservation) */}
                        {hasReservation && (
                            <div className="notification-wrap" ref={notificationRef}>
                                <button 
                                    type="button" 
                                    className="notification-bell is-active" 
                                    aria-label="Notifikasi reservasi" 
                                    aria-expanded={showNotifications} 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowNotifications(!showNotifications);
                                    }}
                                >
                                    <svg className="icon" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                                        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                                    </svg>
                                    <span className="notification-dot" aria-hidden="true" />
                                </button>
                                {showNotifications && reservation && (
                                    <div className="notification-panel" role="status">
                                        <p className="notification-panel-kicker">Reservasi Baru</p>
                                        <strong>{reservation.name}</strong>
                                        <span>{reservation.service} &middot; {reservation.date} jam {reservation.time}</span>
                                        <small>{reservation.phone}</small>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Desktop Book CTA */}
                        <Link href="/reservation" className="header-cta desktop-cta">
                            <span>Book a visit</span>
                            <span aria-hidden="true">&#8599;</span>
                        </Link>

                        {/* Mobile Hamburger Button */}
                        <button
                            type="button"
                            className={`mobile-menu-btn ${isMobileNavOpen ? 'is-open' : ''}`}
                            aria-label={isMobileNavOpen ? 'Tutup navigasi' : 'Buka navigasi'}
                            aria-expanded={isMobileNavOpen}
                            aria-controls="mobile-nav-drawer"
                            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                        >
                            <span className="hamburger-line line-1" aria-hidden="true" />
                            <span className="hamburger-line line-2" aria-hidden="true" />
                            <span className="hamburger-line line-3" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Drawer Backdrop */}
            <div 
                className={`mobile-nav-backdrop ${isMobileNavOpen ? 'is-active' : ''}`}
                onClick={() => setIsMobileNavOpen(false)}
                aria-hidden="true"
            />

            {/* Mobile Navigation Drawer */}
            <aside 
                id="mobile-nav-drawer" 
                className={`mobile-nav-drawer ${isMobileNavOpen ? 'is-active' : ''}`}
                aria-label="Mobile navigation"
                aria-hidden={!isMobileNavOpen}
            >
                <div className="mobile-drawer-header">
                    <Link href="/" className="mobile-drawer-brand" onClick={() => setIsMobileNavOpen(false)}>
                        <img 
                            src="/images/titislogo.jpg" 
                            alt="Titis Beauty Aesthetic" 
                            className="brand-logo" 
                            width="1462" 
                            height="886" 
                        />
                        <div className="brand-text">
                            <strong>TITIS</strong>
                            <small>Beauty Aesthetic</small>
                        </div>
                    </Link>
                    <button 
                        type="button" 
                        className="mobile-drawer-close"
                        aria-label="Tutup menu"
                        onClick={() => setIsMobileNavOpen(false)}
                    >
                        &times;
                    </button>
                </div>

                <div className="mobile-drawer-body">
                    <nav className="mobile-nav-links">
                        {navLinks.map((link) => {
                            const active = isLinkActive(link);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`mobile-nav-item ${active ? 'is-active' : ''}`}
                                    onClick={() => setIsMobileNavOpen(false)}
                                >
                                    <span>{link.label}</span>
                                    <span className="mobile-nav-arrow" aria-hidden="true">&rarr;</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Quick CTA Actions inside mobile menu */}
                    <div className="mobile-drawer-actions">
                        <Link 
                            href="/reservation" 
                            className="mobile-cta-primary"
                            onClick={() => setIsMobileNavOpen(false)}
                        >
                            <span>Reservasi Treatment</span>
                            <span aria-hidden="true">&#8599;</span>
                        </Link>
                        
                        <a 
                            href="https://wa.me/6285175089198?text=Halo%20Titis%20Beauty%20Aesthetic%2C%20saya%20ingin%20konsultasi%20treatment"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mobile-cta-whatsapp"
                            onClick={() => setIsMobileNavOpen(false)}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                            </svg>
                            <span>Konsultasi WhatsApp</span>
                        </a>
                    </div>

                    {/* Salon Information Footer inside Drawer */}
                    <div className="mobile-drawer-footer">
                        <p className="mobile-drawer-info">
                            <strong>Titis Beauty Aesthetic</strong><br />
                            Jl. H. Abdullah No. 77, Jatikramat, Jatiasih, Bekasi<br />
                            Buka Setiap Hari: 09.00 - 20.00 WIB
                        </p>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Header;