'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer: React.FC = () => {
    const pathname = usePathname();
    const currentYear = new Date().getFullYear();

    // Do not render public footer on admin workspace or admin login
    if (pathname?.startsWith('/admin')) {
        return null;
    }

    return (
        <footer className="site-footer" role="contentinfo">
            {/* Ambient Red Glow Effects */}
            <div className="footer-ambient-glow" aria-hidden="true" />
            
            <div className="footer-container section-shell">
                {/* Pre-Footer Action Banner */}
                <div className="footer-cta-banner">
                    <div className="footer-cta-content">
                        <span className="footer-cta-eyebrow">
                            <span className="footer-pulse-dot" aria-hidden="true" />
                            KONSULTASI & RESERVASI KULIT
                        </span>
                        <h2 className="footer-cta-title">
                            Siap Dapatkan Kulit Glowing & Sehat Impian Anda?
                        </h2>
                        <p className="footer-cta-desc">
                            Konsultasikan keluhan kulitmu langsung bersama terapis & ahli estetika kami di Titis Beauty Aesthetic.
                        </p>
                    </div>
                    <div className="footer-cta-actions">
                        <Link href="/reservation" className="footer-btn-primary">
                            <span>Booking Sekarang</span>
                            <span aria-hidden="true" className="footer-btn-arrow">&#8599;</span>
                        </Link>
                        <a 
                            href="https://wa.me/6285175089198?text=Halo%20Titis%20Beauty%20Aesthetic%2C%20saya%20ingin%20konsultasi%20jadwal%20dan%20treatment" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="footer-btn-whatsapp"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                            </svg>
                            <span>Chat WhatsApp</span>
                        </a>
                    </div>
                </div>

                {/* 4-Column Main Footer Grid */}
                <div className="footer-grid">
                    {/* Column 1: Brand & Identity */}
                    <div className="footer-col footer-col-brand">
                        <Link href="/" className="footer-brand" aria-label="Titis Beauty Aesthetic">
                            <img 
                                src="/images/titislogo.jpg" 
                                alt="Titis Beauty Aesthetic Logo" 
                                className="footer-brand-logo" 
                                width="1462" 
                                height="886" 
                            />
                            <div className="footer-brand-text">
                                <strong>TITIS</strong>
                                <small>Beauty Aesthetic</small>
                            </div>
                        </Link>
                        <p className="footer-brand-tagline">
                            Klinik estetika & perawatan kecantikan terpercaya di Bekasi dengan sentuhan modern, higienis, dan berstandar medis untuk kulit sehat bercahaya alami.
                        </p>
                        
                        {/* Social / Contact Badges */}
                        <div className="footer-social-links">
                            <a 
                                href="https://wa.me/6285175089198" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="footer-social-badge"
                                aria-label="WhatsApp Titis"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                                </svg>
                                <span>0851-7508-9198</span>
                            </a>
                            <a 
                                href="https://www.instagram.com/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="footer-social-badge"
                                aria-label="Instagram Titis"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                                </svg>
                                <span>@titisbeautysalon</span>
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Navigation */}
                    <div className="footer-col">
                        <h3 className="footer-heading">
                            <span>Eksplorasi</span>
                        </h3>
                        <ul className="footer-links">
                            <li>
                                <Link href="/" className="footer-link">
                                    <span>Beranda</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/treatment" className="footer-link">
                                    <span>Layanan Treatment</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="footer-link">
                                    <span>Tentang Kami</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/reservation" className="footer-link">
                                    <span>Booking Reservasi</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="footer-link">
                                    <span>Kontak & Lokasi</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Treatment Populer */}
                    <div className="footer-col">
                        <h3 className="footer-heading">
                            <span>Treatment Populer</span>
                        </h3>
                        <ul className="footer-links">
                            <li>
                                <Link href="/services/facial-brightening" className="footer-link">
                                    <span>Facial Brightening</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/services/facial-agne" className="footer-link">
                                    <span>Facial Agne</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/services/facial-hydra-dermabration" className="footer-link">
                                    <span>Facial Hydra Dermabration</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/services/rf-radiofrequency" className="footer-link">
                                    <span>RF (RadioFrequency)</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/services/creambath" className="footer-link">
                                    <span>Creambath & Hair Spa</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/treatment" className="footer-link footer-link-all">
                                    <span>Lihat Semua Layanan &rarr;</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Alamat & Jam Buka */}
                    <div className="footer-col footer-col-info">
                        <h3 className="footer-heading">
                            <span>Kunjungi Klinik</span>
                        </h3>
                        
                        <div className="footer-info-card">
                            <div className="footer-info-row">
                                <span className="footer-info-icon" aria-hidden="true">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                        <circle cx="12" cy="10" r="3"/>
                                    </svg>
                                </span>
                                <div className="footer-info-text">
                                    <p className="footer-address">
                                        Jl. H. Abdullah No. 77, RT 02 / RW 02, Jatikramat, Kec. Jatiasih, Kota Bekasi, Jawa Barat 17421
                                    </p>
                                </div>
                            </div>

                            <div className="footer-info-row">
                                <span className="footer-info-icon" aria-hidden="true">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"/>
                                        <polyline points="12 6 12 12 16 14"/>
                                    </svg>
                                </span>
                                <div className="footer-info-text">
                                    <p className="footer-hours">
                                        <strong>Senin &ndash; Minggu</strong><br />
                                        09.00 &ndash; 20.00 WIB
                                    </p>
                                    <span className="footer-status-tag">
                                        <span className="footer-status-dot" aria-hidden="true" />
                                        Buka Setiap Hari
                                    </span>
                                </div>
                            </div>

                            <a 
                                href="https://www.google.com/maps/search/?api=1&query=titis+beauty+aesthetic" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="footer-maps-btn"
                            >
                                <span>Petunjuk Arah Google Maps</span>
                                <span aria-hidden="true">&#8599;</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom Bar */}
            <div className="footer-bottom-bar">
                <div className="footer-bottom-inner section-shell">
                    <p className="footer-copy">
                        &copy; {currentYear} <strong>Titis Beauty Aesthetic</strong>. Seluruh hak cipta dilindungi.
                    </p>
                    <p className="footer-motto">
                        Beauty & Confidence, Crafted with Care.
                    </p>
                    <div className="footer-admin-wrap">
                        <Link href="/admin/login" className="footer-admin-btn">
                            <span>Admin Portal</span>
                            <span aria-hidden="true">&#8599;</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;