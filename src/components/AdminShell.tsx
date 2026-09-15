'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

interface NavLinkItem {
    href: string;
    label: string;
    icon: React.ReactNode;
}

const navLinks: NavLinkItem[] = [
    { 
        href: '/admin', 
        label: 'Ringkasan / Overview', 
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
            </svg>
        ) 
    },
    { 
        href: '/admin/patients', 
        label: 'Data Pasien', 
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
        ) 
    },
    { 
        href: '/admin/staff', 
        label: 'Tim & Terapis', 
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
            </svg>
        ) 
    },
    { 
        href: '/admin/reports', 
        label: 'Laporan & Transaksi', 
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="12" y1="20" x2="12" y2="10"/>
                <line x1="18" y1="20" x2="18" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="16"/>
            </svg>
        ) 
    },
];

const AdminShell = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.replace('/admin/login');
                return;
            }
            if (session.user?.email) {
                setUserEmail(session.user.email);
            }
            setIsLoading(false);
        };

        void checkSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) {
                router.replace('/admin/login');
            } else {
                if (session.user?.email) {
                    setUserEmail(session.user.email);
                }
                setIsLoading(false);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router]);

    const handleSignOut = async () => {
        if (isSigningOut) return;
        setIsSigningOut(true);
        try {
            await supabase.auth.signOut();
            router.replace('/admin/login');
            router.refresh();
        } catch {
            router.replace('/admin/login');
        } finally {
            setIsSigningOut(false);
        }
    };

    if (isLoading) {
        return (
            <div className="admin-shell-loading">
                <div className="admin-shell-spinner" aria-hidden="true" />
                <p>Memverifikasi akses admin...</p>
            </div>
        );
    }

    const currentPage = navLinks.find(link => link.href === pathname) || navLinks[0];

    return (
        <div className="admin-shell">
            {/* Sidebar Navigation */}
            <aside className="admin-sidebar">
                <div className="admin-brand-wrap">
                    <Link href="/admin" className="admin-brand">
                        <img 
                            src="/images/titislogo.jpg" 
                            alt="Titis Beauty Aesthetic" 
                            className="admin-brand-logo" 
                        />
                        <div className="admin-brand-text">
                            <strong>TITIS</strong>
                            <small>Admin Studio</small>
                        </div>
                    </Link>
                </div>

                <nav className="admin-nav" aria-label="Navigasi admin">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link 
                                key={link.href} 
                                href={link.href} 
                                className={`admin-nav-item ${isActive ? 'active' : ''}`}
                            >
                                <span className="admin-nav-icon">{link.icon}</span>
                                <span>{link.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Footer with Profile and Logout Button */}
                <div className="admin-sidebar-footer">
                    <Link href="/" className="admin-view-site-link" target="_blank" rel="noopener noreferrer">
                        <span>Buka Website Utama</span>
                        <span aria-hidden="true">&#8599;</span>
                    </Link>

                    {/* Admin User Card */}
                    <div className="admin-user-card">
                        <div className="admin-user-avatar">
                            {userEmail ? userEmail.charAt(0).toUpperCase() : 'A'}
                        </div>
                        <div className="admin-user-details">
                            <span className="admin-user-role">Administrator</span>
                            <span className="admin-user-email" title={userEmail || 'admin'}>
                                {userEmail || 'admin@titis.com'}
                            </span>
                        </div>
                    </div>

                    {/* Dedicated Logout Button */}
                    <button 
                        type="button" 
                        className="admin-logout-btn" 
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        title="Keluar dari sesi administrator"
                    >
                        {isSigningOut ? (
                            <>
                                <span className="admin-logout-spinner" aria-hidden="true" />
                                <span>Keluar...</span>
                            </>
                        ) : (
                            <>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                    <polyline points="16 17 21 12 16 7"/>
                                    <line x1="21" y1="12" x2="9" y2="12"/>
                                </svg>
                                <span>Keluar (Logout)</span>
                            </>
                        )}
                    </button>
                </div>
            </aside>

            {/* Main Area with Sticky Topbar */}
            <div className="admin-main-wrapper">
                <header className="admin-topbar">
                    <div className="admin-topbar-left">
                        <span className="admin-topbar-crumb">Portal Manajemen</span>
                        <span className="admin-topbar-divider">/</span>
                        <span className="admin-topbar-title">{currentPage.label}</span>
                    </div>

                    <div className="admin-topbar-right">
                        <Link href="/" className="admin-topbar-site-link" target="_blank" rel="noopener noreferrer">
                            <span>Website</span>
                            <span aria-hidden="true">&#8599;</span>
                        </Link>

                        <div className="admin-topbar-user">
                            <span className="admin-status-dot" aria-hidden="true" />
                            <span className="admin-topbar-email">{userEmail || 'Admin'}</span>
                        </div>

                        {/* Topbar Logout Button */}
                        <button 
                            type="button" 
                            className="admin-topbar-logout-btn" 
                            onClick={handleSignOut}
                            disabled={isSigningOut}
                            title="Keluar dari sesi administrator"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                <polyline points="16 17 21 12 16 7"/>
                                <line x1="21" y1="12" x2="9" y2="12"/>
                            </svg>
                            <span>{isSigningOut ? 'Keluar...' : 'Logout'}</span>
                        </button>
                    </div>
                </header>

                <main className="admin-main">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminShell;
