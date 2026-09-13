'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
    const pathname = usePathname();
    const [hasReservation, setHasReservation] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [reservation, setReservation] = useState<{ name: string; phone: string; service: string; date: string; time: string } | null>(null);

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

    return (
        <header className={`site-header ${pathname === '/' ? 'home-site-header' : ''}`}>
            <div className="header-inner">
                <Link href="/" className="brand">
                    <img src="/images/titislogo.jpg" alt="Titis Beauty Aesthetic" className="brand-logo" width="1462" height="886" />
                </Link>
                <nav className="main-nav" aria-label="Main navigation">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/treatment">Treatment</Link>
                    <Link href="/contact">Contact</Link>
                </nav>
                {hasReservation && (
                    <div className="notification-wrap">
                        <button type="button" className="notification-bell is-active" aria-label="View notifications" aria-expanded={showNotifications} title="Notifications" onClick={() => setShowNotifications(!showNotifications)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                                <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                            </svg>
                            <span className="notification-dot" aria-hidden="true" />
                        </button>
                        {showNotifications && reservation && (
                            <div className="notification-panel" role="status">
                                <p className="notification-panel-kicker">New reservation</p>
                                <strong>{reservation.name}</strong>
                                <span>{reservation.service} &middot; {reservation.date} at {reservation.time}</span>
                                <small>{reservation.phone}</small>
                            </div>
                        )}
                    </div>
                )}
                <Link href="/reservation" className="header-cta">Book a visit <span aria-hidden="true">&#8599;</span></Link>
            </div>
        </header>
    );
};

export default Header;