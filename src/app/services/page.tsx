import React from 'react';
import ServiceGrid from '@/components/ServiceGrid';

export const metadata = {
    title: 'Treatment Kami | Titis Beauty Aesthetic',
    description: 'Daftar lengkap perawatan estetika wajah (Facial Treatment) dan perawatan rambut (Hair Treatment) di Titis Beauty Aesthetic Bekasi.',
};

const ServicesPage = () => {
    return (
        <div className="services-page">
            <section className="treatment-page-hero">
                <div className="section-shell">
                    <span className="treatment-hero-pill-badge">MENU PERAWATAN EKSKLUSIF</span>
                    <h1>Treatment Kami</h1>
                    <p>
                        Pilihan lengkap ritual perawatan kulit wajah dan mahkota rambut profesional yang dirancang khusus untuk memancarkan pesona terbaik Anda.
                    </p>
                    <div className="treatment-hero-category-chips">
                        <a href="#facial-treatment" className="hero-cat-chip">
                            <span className="chip-bullet">01</span>
                            <strong>Facial Treatment</strong>
                            <span className="chip-badge">5 Menu</span>
                        </a>
                        <a href="#hair-treatment" className="hero-cat-chip">
                            <span className="chip-bullet">02</span>
                            <strong>Hair Treatment</strong>
                            <span className="chip-badge">4 Menu</span>
                        </a>
                    </div>
                </div>
            </section>

            <section className="services-list section-shell">
                <ServiceGrid variant="page" />
            </section>
        </div>
    );
};

export default ServicesPage;