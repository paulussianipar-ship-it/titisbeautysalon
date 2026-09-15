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
            <div className="footer-container section-shell">
                {/* 4-Column Main Grid matching reference model */}
                <div className="footer-grid">
                    {/* Column 1: Brand Script Logo, Tagline & Social Icons */}
                    <div className="footer-col footer-col-brand">
                        <Link href="/" className="footer-script-logo" aria-label="Titis Beauty">
                            Titis Beauty
                        </Link>
                        <p className="footer-tagline">
                            Enhancing your beauty, one touch at a time. A luxury studio for glowing skin, hair wellness and care.
                        </p>

                        <div className="footer-social-row">
                            <a
                                href="https://www.instagram.com/titisbeautyaesthetic"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-social-circle"
                                aria-label="Instagram"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </a>
                            <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-social-circle"
                                aria-label="Facebook"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.tiktok.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-social-circle"
                                aria-label="TikTok"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                </svg>
                            </a>
                            <a
                                href="https://wa.me/6285175089198"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-social-circle"
                                aria-label="WhatsApp"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Services */}
                    <div className="footer-col footer-col-services">
                        <h3 className="footer-heading">Services</h3>
                        <ul className="footer-clean-list">
                            <li>
                                <Link href="/services/facial-brightening">Facial Brightening</Link>
                            </li>
                            <li>
                                <Link href="/services/facial-agne">Facial Agne</Link>
                            </li>
                            <li>
                                <Link href="/services/facial-hydra-dermabration">Facial Hydra Dermabration</Link>
                            </li>
                            <li>
                                <Link href="/services/rf-radiofrequency">RF (RadioFrequency)</Link>
                            </li>
                            <li>
                                <Link href="/services/massage-wajah">Massage Wajah</Link>
                            </li>
                            <li>
                                <Link href="/services/potong-rambut-wanita">Potong Rambut (Wanita)</Link>
                            </li>
                            <li>
                                <Link href="/services/creambath">Creambath</Link>
                            </li>
                            <li>
                                <Link href="/services/cuci-rambut-catok-blow">Cuci Rambut + Catok/Blow</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Visit */}
                    <div className="footer-col footer-col-visit">
                        <h3 className="footer-heading">Visit</h3>
                        <div className="footer-visit-group">
                            <div className="footer-visit-row">
                                <span className="footer-visit-icon" aria-hidden="true">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </span>
                                <div className="footer-visit-desc">
                                    Jl. H. Abdullah No. 77, Jatikramat, Kec. Jatiasih, Kota Bekasi
                                </div>
                            </div>

                            <div className="footer-visit-row">
                                <span className="footer-visit-icon" aria-hidden="true">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </span>
                                <div className="footer-visit-desc">
                                    <a href="tel:+6285175089198">+62 851 7508 9198</a>
                                </div>
                            </div>

                            <div className="footer-visit-row">
                                <span className="footer-visit-icon" aria-hidden="true">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                </span>
                                <div className="footer-visit-desc">
                                    Mon – Sun, 9:00 AM – 8:00 PM
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 4: Book Now */}
                    <div className="footer-col footer-col-book">
                        <h3 className="footer-heading">Book Now</h3>
                        <p className="footer-book-desc">
                            Ready to feel beautiful? Reach out on WhatsApp.
                        </p>
                        <a
                            href="https://wa.me/6285175089198?text=Halo%20Titis%20Beauty%20Aesthetic%2C%20saya%20ingin%20konsultasi%20jadwal%20dan%20treatment"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-chat-btn"
                        >
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>
            </div>

            {/* Subtle Divider & Bottom Bar */}
            <div className="footer-bottom-bar">
                <div className="footer-bottom-inner section-shell">
                    <p className="footer-copyright">
                        &copy; {currentYear} Titis Beauty. All rights reserved.
                    </p>
                    <div className="footer-crafted-wrap">
                        <span className="footer-crafted-text">Crafted with care in Bekasi</span>
                        <Link href="/admin/login" className="footer-admin-link">
                            Admin
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;