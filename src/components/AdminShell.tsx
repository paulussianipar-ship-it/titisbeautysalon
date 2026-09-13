'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const links = [
    { href: '/admin', label: 'Overview' },
    { href: '/admin/patients', label: 'Patients' },
    { href: '/admin/staff', label: 'Staff' },
    { href: '/admin/reports', label: 'Sales & reports' },
];

const AdminShell = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

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
            </aside>
            <main className="admin-main">{children}</main>
        </div>
    );
};

export default AdminShell;
