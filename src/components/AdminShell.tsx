'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

const links = [
    { href: '/admin', label: 'Overview' },
    { href: '/admin/patients', label: 'Patients' },
    { href: '/admin/staff', label: 'Staff' },
    { href: '/admin/reports', label: 'Sales & reports' },
];

const AdminShell = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.replace('/admin/login');
                return;
            }
            setIsLoading(false);
        };

        void checkSession();
    }, [router]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.replace('/admin/login');
    };

    if (isLoading) {
        return <div className="admin-shell" aria-busy="true" />;
    }

    return (
        <div className="admin-shell">
            <aside className="admin-sidebar">
                <Link href="/admin" className="admin-brand">
                    <img src="/images/titislogo.jpg" alt="Titis Beauty Aesthetic" className="admin-brand-logo" />
                </Link>
                <nav className="admin-nav" aria-label="Admin navigation">
                    {links.map((link) => (
                        <Link key={link.href} href={link.href} className={pathname === link.href ? 'active' : ''}>
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <Link href="/" className="admin-back-link">Back to website <span aria-hidden="true">&#8599;</span></Link>
                <button type="button" className="admin-back-link" onClick={handleSignOut}>Sign out</button>
            </aside>
            <main className="admin-main">{children}</main>
        </div>
    );
};

export default AdminShell;
