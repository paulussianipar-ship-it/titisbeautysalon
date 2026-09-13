'use client';

import React from 'react';
import { useState, useEffect } from 'react';

const HeroSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slides = [
        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=2200&q=85',
        'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=2200&q=85',
        'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=2200&q=85',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <section className="hero-slider">
            <div className="slides">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentIndex ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${slide})` }}
                    />
                ))}
            </div>
            <div className="hero-content section-shell">
                <img src="/images/titislogo.jpg" alt="Titis Beauty Aesthetic" className="hero-logo" width="1462" height="886" />
                <p className="eyebrow hero-eyebrow">Titis Beauty Aesthetic &middot; Bekasi</p>
                <h1>Perawatan kulit<br /><em>yang terpercaya.</em></h1>
                <p className="hero-copy">Perawatan profesional yang dirancang untuk membantu kulitmu tampil sehat, segar, dan percaya diri.</p>
                <div className="hero-actions">
                    <a href="/reservation" className="button button-light">Konsultasi gratis <span aria-hidden="true">&#8599;</span></a>
                    <a href="/services" className="text-link light-link">Lihat treatment <span aria-hidden="true">&#8594;</span></a>
                </div>
            </div>
            <div className="hero-meta"><span>01</span><span className="hero-line" /><span>03</span></div>
            <div className="slider-controls">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
            <a className="hero-whatsapp" href="https://wa.me/6285175089198" target="_blank" rel="noopener noreferrer" aria-label="Chat with Titis Beauty Aesthetic on WhatsApp" title="Chat WhatsApp">
                <span aria-hidden="true">&#9742;</span>
            </a>
        </section>
    );
};

export default HeroSlider;