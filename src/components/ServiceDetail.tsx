'use client';

import React from 'react';
import Link from 'next/link';
import { services as allServices, ServiceItem } from '@/data/services';

interface ServiceDetailProps {
    service: {
        id?: string;
        name: string;
        description: string;
        image: string;
        price?: number;
        slug?: string;
        duration?: string;
        benefits?: string[];
    };
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service }) => {
    // Find related services excluding the current one
    const relatedServices = allServices
        .filter(s => s.name.toLowerCase() !== service.name.toLowerCase())
        .slice(0, 3);

    const whatsappMessage = encodeURIComponent(
        `Halo Titis Beauty Aesthetic, saya tertarik untuk reservasi treatment "${service.name}". Apakah ada jadwal yang tersedia?`
    );
    const whatsappUrl = `https://wa.me/6285175089198?text=${whatsappMessage}`;

    return (
        <div className="service-detail-page">
            {/* Header Hero Banner */}
            <div className="service-detail-hero">
                <div className="section-shell">
                    <nav className="detail-breadcrumbs" aria-label="Breadcrumb">
                        <Link href="/">Beranda</Link>
                        <span className="breadcrumb-sep">/</span>
                        <Link href="/services">Treatment Kami</Link>
                        <span className="breadcrumb-sep">/</span>
                        <span className="breadcrumb-current">{service.name}</span>
                    </nav>
                </div>
            </div>

            <div className="section-shell service-detail-container">
                <div className="service-detail-grid">
                    {/* Left: Treatment Visual Showcase */}
                    <div className="service-detail-media">
                        <div className="service-detail-img-card">
                            <img 
                                src={service.image} 
                                alt={service.name} 
                                className="service-detail-img" 
                            />
                            <div className="service-detail-img-glow" />
                        </div>
                    </div>

                    {/* Right: Treatment Information & Booking */}
                    <div className="service-detail-info">
                        <div className="service-detail-badge-row">
                            <span className="service-category-tag">Perawatan Eksklusif</span>
                            {service.duration && (
                                <span className="service-duration-pill">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <circle cx="12" cy="12" r="10"/>
                                        <polyline points="12 6 12 12 16 14"/>
                                    </svg>
                                    {service.duration}
                                </span>
                            )}
                        </div>

                        <h1 className="service-detail-title">{service.name}</h1>

                        {service.price !== undefined && (
                            <div className="service-detail-price-box">
                                <span className="price-label">Biaya Perawatan</span>
                                <div className="price-value">
                                    Rp {service.price.toLocaleString('id-ID')}
                                </div>
                            </div>
                        )}

                        <div className="service-detail-desc">
                            <p>{service.description}</p>
                        </div>

                        {service.benefits && service.benefits.length > 0 && (
                            <div className="service-benefits-section">
                                <h3 className="benefits-heading">Manfaat & Hasil Perawatan:</h3>
                                <ul className="benefits-list">
                                    {service.benefits.map((benefit, idx) => (
                                        <li key={idx}>
                                            <span className="benefit-check" aria-hidden="true">&#10003;</span>
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* CTA Actions */}
                        <div className="service-detail-actions">
                            <Link 
                                href={`/reservation?service=${encodeURIComponent(service.name)}`}
                                className="button-reserve-primary"
                            >
                                <span>Reservasi Sekarang</span>
                                <span aria-hidden="true">&rarr;</span>
                            </Link>

                            <a 
                                href={whatsappUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="button-consult-wa"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                                </svg>
                                <span>Tanya via WhatsApp</span>
                            </a>
                        </div>

                        <div className="service-safety-guarantee">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                            <span>Dikerjakan oleh Beautician tersertifikasi dengan alat higienis & steril.</span>
                        </div>
                    </div>
                </div>

                {/* Related Treatments Section */}
                {relatedServices.length > 0 && (
                    <div className="related-services-section">
                        <div className="related-header">
                            <h2>Perawatan Lainnya</h2>
                            <Link href="/services" className="link-view-all">
                                Lihat Semua Treatment <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                        <div className="related-grid">
                            {relatedServices.map((item) => (
                                <div key={item.id} className="related-card">
                                    <Link href={`/services/${item.slug}`} className="related-card-link">
                                        <div className="related-img-wrap">
                                            <img src={item.image} alt={item.name} loading="lazy" />
                                        </div>
                                        <div className="related-info">
                                            <h4>{item.name}</h4>
                                            <div className="related-meta">
                                                <span>{item.duration || 'Perawatan'}</span>
                                                <strong>Rp {item.price.toLocaleString('id-ID')}</strong>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceDetail;