"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { services as serviceData, ServiceItem } from '@/data/services';

const ServiceGrid = ({ variant = 'home' }: { variant?: 'home' | 'page' }) => {
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    // Refs for animation & drag (accelerated speed per user request)
    const NORMAL_SPEED = 2.4;
    const HOVER_SPEED = 0.8;

    const currentSpeedRef = useRef(NORMAL_SPEED);
    const targetSpeedRef = useRef(NORMAL_SPEED);
    const isHoveredRef = useRef(false);
    const isDraggingRef = useRef(false);
    const hasDraggedRef = useRef(false);
    const dragStartXRef = useRef(0);
    const dragStartScrollLeftRef = useRef(0);
    const animationFrameIdRef = useRef<number | null>(null);

    // 3 identical sets of services to ensure seamless, infinite looping in both directions
    const carouselItems = [...serviceData, ...serviceData, ...serviceData];

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (variant !== 'home') return;

        const slider = sliderRef.current;
        if (!slider) return;

        // Position initial scroll in the middle set of items for bidirectional wrap
        const initializePosition = () => {
            const singleSetWidth = slider.scrollWidth / 3;
            if (singleSetWidth > 0 && slider.scrollLeft === 0) {
                slider.scrollLeft = singleSetWidth;
            }
        };

        // Small delay to ensure styles and images have calculated scrollWidth
        const initTimer = window.setTimeout(initializePosition, 50);

        const checkLoopBoundaries = () => {
            const singleSetWidth = slider.scrollWidth / 3;
            if (singleSetWidth <= 0) return;

            // When scrolled past the second set, wrap back to the first duplicate set seamlessly
            if (slider.scrollLeft >= singleSetWidth * 2) {
                slider.scrollLeft -= singleSetWidth;
            } else if (slider.scrollLeft <= 5) {
                // When manually scrolled too far left, wrap to the middle set
                slider.scrollLeft += singleSetWidth;
            }
        };

        const step = () => {
            if (!isDraggingRef.current) {
                // Smooth speed interpolation (slower on hover, fast normally)
                const target = isHoveredRef.current ? HOVER_SPEED : NORMAL_SPEED;
                currentSpeedRef.current += (target - currentSpeedRef.current) * 0.1;

                slider.scrollLeft += currentSpeedRef.current;
                checkLoopBoundaries();
            }

            animationFrameIdRef.current = requestAnimationFrame(step);
        };

        animationFrameIdRef.current = requestAnimationFrame(step);

        // Hover listeners: Slow down speed on mouse hover
        const onMouseEnter = () => {
            isHoveredRef.current = true;
            targetSpeedRef.current = HOVER_SPEED;
        };

        const onMouseLeave = () => {
            isHoveredRef.current = false;
            targetSpeedRef.current = NORMAL_SPEED;
        };

        // Pointer Drag listeners (Touch & Mouse)
        const onPointerDown = (event: PointerEvent) => {
            isDraggingRef.current = true;
            hasDraggedRef.current = false;
            dragStartXRef.current = event.clientX;
            dragStartScrollLeftRef.current = slider.scrollLeft;
            slider.style.cursor = 'grabbing';
            slider.style.scrollBehavior = 'auto';

            if (slider.setPointerCapture) {
                try {
                    slider.setPointerCapture(event.pointerId);
                } catch {
                    // Ignore capture errors on unsupported devices
                }
            }
        };

        const onPointerMove = (event: PointerEvent) => {
            if (!isDraggingRef.current) return;

            const deltaX = event.clientX - dragStartXRef.current;
            if (Math.abs(deltaX) > 6) {
                hasDraggedRef.current = true;
            }

            slider.scrollLeft = dragStartScrollLeftRef.current - deltaX;
            checkLoopBoundaries();
        };

        const onPointerUp = (event?: PointerEvent) => {
            if (!isDraggingRef.current) return;
            isDraggingRef.current = false;
            slider.style.cursor = '';

            if (event && slider.hasPointerCapture?.(event.pointerId)) {
                try {
                    slider.releasePointerCapture(event.pointerId);
                } catch {
                    // Ignore capture errors
                }
            }

            // Keep hasDraggedRef true momentarily so click event on link is suppressed
            window.setTimeout(() => {
                hasDraggedRef.current = false;
            }, 100);
        };

        const onScroll = () => {
            checkLoopBoundaries();
        };

        slider.addEventListener('mouseenter', onMouseEnter);
        slider.addEventListener('mouseleave', onMouseLeave);
        slider.addEventListener('pointerdown', onPointerDown);
        slider.addEventListener('pointermove', onPointerMove);
        slider.addEventListener('pointerup', onPointerUp);
        slider.addEventListener('pointercancel', onPointerUp);
        slider.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.clearTimeout(initTimer);
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
            slider.removeEventListener('mouseenter', onMouseEnter);
            slider.removeEventListener('mouseleave', onMouseLeave);
            slider.removeEventListener('pointerdown', onPointerDown);
            slider.removeEventListener('pointermove', onPointerMove);
            slider.removeEventListener('pointerup', onPointerUp);
            slider.removeEventListener('pointercancel', onPointerUp);
            slider.removeEventListener('scroll', onScroll);
        };
    }, [variant]);

    const handleArrowNudge = (direction: 'left' | 'right') => {
        const slider = sliderRef.current;
        if (!slider) return;
        const scrollAmount = direction === 'left' ? -330 : 330;
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    if (variant === 'page') {
        const [activeFilter, setActiveFilter] = useState<'all' | 'facial' | 'hair'>('all');

        const facialServices = serviceData.filter(s => s.category === 'Facial Treatment');
        const hairServices = serviceData.filter(s => s.category === 'Hair Treatment');

        return (
            <div className="treatment-page-container">
                {/* Category Filter Tabs */}
                <div className="treatment-filter-tabs" role="tablist" aria-label="Filter Kategori Treatment">
                    <button
                        type="button"
                        role="tab"
                        aria-selected={activeFilter === 'all'}
                        className={`treatment-tab-btn ${activeFilter === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('all')}
                    >
                        <span>Semua Treatment</span>
                        <span className="tab-count">{serviceData.length}</span>
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={activeFilter === 'facial'}
                        className={`treatment-tab-btn ${activeFilter === 'facial' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('facial')}
                    >
                        <span>1. Facial Treatment</span>
                        <span className="tab-count">{facialServices.length}</span>
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={activeFilter === 'hair'}
                        className={`treatment-tab-btn ${activeFilter === 'hair' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('hair')}
                    >
                        <span>2. Hair Treatment</span>
                        <span className="tab-count">{hairServices.length}</span>
                    </button>
                </div>

                {/* Section 1: Facial Treatment */}
                {(activeFilter === 'all' || activeFilter === 'facial') && (
                    <section id="facial-treatment" className="treatment-category-block">
                        <div className="treatment-category-header">
                            <div className="category-title-wrap">
                                <span className="category-num-badge">01</span>
                                <div>
                                    <h2 className="treatment-category-title">1. Facial Treatment</h2>
                                    <p className="treatment-category-desc">
                                        Perawatan wajah komprehensif mulai dari pembersihan mendalam, pencerah, terapi jerawat, hingga pengencangan kulit modern.
                                    </p>
                                </div>
                            </div>
                            <span className="category-count-pill">{facialServices.length} Menu Pilihan</span>
                        </div>

                        <div className="services-list-grid">
                            {facialServices.map((service: ServiceItem) => (
                                <div key={service.id} className="service-page-card modern-card">
                                    <div className="service-page-image-wrap">
                                        <img src={service.image} alt={service.name} loading="lazy" />
                                        <div className="card-top-badges">
                                            <span className="code-pill">
                                                <strong>{service.code}</strong>
                                            </span>
                                            {service.duration && (
                                                <span className="duration-pill">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                        <circle cx="12" cy="12" r="10"/>
                                                        <polyline points="12 6 12 12 16 14"/>
                                                    </svg>
                                                    {service.duration}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="service-page-copy">
                                        <div className="card-title-row">
                                            <span className="card-item-letter">{service.code}.</span>
                                            <h3 className="card-item-name">{service.name}</h3>
                                        </div>
                                        <p className="card-item-desc">{service.description}</p>
                                        
                                        {service.benefits && service.benefits.length > 0 && (
                                            <ul className="card-benefits-preview">
                                                {service.benefits.slice(0, 2).map((b, i) => (
                                                    <li key={i}>
                                                        <span className="check-dot">&#10003;</span> {b}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        <div className="card-footer-action">
                                            <div className="card-price-block">
                                                <span className="price-tag-label">Biaya Perawatan</span>
                                                <strong className="price-tag-val">Rp {service.price.toLocaleString('id-ID')}</strong>
                                            </div>
                                            <div className="card-btns">
                                                <Link href={`/services/${service.slug}`} className="btn-card-detail">
                                                    Detail
                                                </Link>
                                                <Link 
                                                    href={`/reservation?service=${encodeURIComponent(service.name)}`}
                                                    className="btn-card-book"
                                                >
                                                    Booking
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Section 2: Hair Treatment */}
                {(activeFilter === 'all' || activeFilter === 'hair') && (
                    <section id="hair-treatment" className="treatment-category-block">
                        <div className="treatment-category-header">
                            <div className="category-title-wrap">
                                <span className="category-num-badge">02</span>
                                <div>
                                    <h2 className="treatment-category-title">2. Hair Treatment</h2>
                                    <p className="treatment-category-desc">
                                        Perawatan kesehatan dan kecantikan helai rambut, kulit kepala, creambath relaksasi, hingga penataan gaya mahkota Anda.
                                    </p>
                                </div>
                            </div>
                            <span className="category-count-pill">{hairServices.length} Menu Pilihan</span>
                        </div>

                        <div className="services-list-grid">
                            {hairServices.map((service: ServiceItem) => (
                                <div key={service.id} className="service-page-card modern-card">
                                    <div className="service-page-image-wrap">
                                        <img src={service.image} alt={service.name} loading="lazy" />
                                        <div className="card-top-badges">
                                            <span className="code-pill">
                                                <strong>{service.code}</strong>
                                            </span>
                                            {service.duration && (
                                                <span className="duration-pill">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                        <circle cx="12" cy="12" r="10"/>
                                                        <polyline points="12 6 12 12 16 14"/>
                                                    </svg>
                                                    {service.duration}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="service-page-copy">
                                        <div className="card-title-row">
                                            <span className="card-item-letter">{service.code}.</span>
                                            <h3 className="card-item-name">{service.name}</h3>
                                        </div>
                                        <p className="card-item-desc">{service.description}</p>
                                        
                                        {service.benefits && service.benefits.length > 0 && (
                                            <ul className="card-benefits-preview">
                                                {service.benefits.slice(0, 2).map((b, i) => (
                                                    <li key={i}>
                                                        <span className="check-dot">&#10003;</span> {b}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        <div className="card-footer-action">
                                            <div className="card-price-block">
                                                <span className="price-tag-label">Biaya Perawatan</span>
                                                <strong className="price-tag-val">Rp {service.price.toLocaleString('id-ID')}</strong>
                                            </div>
                                            <div className="card-btns">
                                                <Link href={`/services/${service.slug}`} className="btn-card-detail">
                                                    Detail
                                                </Link>
                                                <Link 
                                                    href={`/reservation?service=${encodeURIComponent(service.name)}`}
                                                    className="btn-card-book"
                                                >
                                                    Booking
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        );
    }

    return (
        <div className="treatment-carousel-wrapper">
            <div className="swiper treatmentSwiper">
                <div 
                    className="swiper-wrapper treatment-slider" 
                    ref={sliderRef}
                    tabIndex={0}
                    role="region"
                    aria-label="Carousel Treatment Titis Beauty Salon"
                >
                    {carouselItems.map((service: ServiceItem, index: number) => {
                        const uniqueKey = `${service.slug}-${index}`;
                        return (
                            <div 
                                key={uniqueKey} 
                                className="swiper-slide treatment-slide-card" 
                                style={{ width: '306px', marginRight: '24px' }}
                            >
                                <Link 
                                    href={`/services/${service.slug}`} 
                                    className="cat-card-home"
                                    onClick={(e) => {
                                        // Prevent opening link if user was dragging/swiping
                                        if (hasDraggedRef.current) {
                                            e.preventDefault();
                                        }
                                    }}
                                >
                                    <div className="cat-card-home-img">
                                        <img 
                                            src={service.image} 
                                            alt={service.name} 
                                            draggable={false}
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="cat-card-home-overlay" />
                                    <div className="cat-card-home-body">
                                        <span className="cat-card-home-category">
                                            {service.categoryNumber}.{service.code} &bull; {service.category}
                                        </span>
                                        <h3 className="cat-card-home-name">{service.name}</h3>
                                        <div className="cat-card-home-meta">
                                            <span className="cat-card-home-count">{service.duration || service.count || '1 Treatment'}</span>
                                            {service.price && (
                                                <span className="cat-card-home-price">
                                                    Rp {service.price.toLocaleString('id-ID')}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Navigation arrows for accessibility & manual control */}
            <div className="treatment-controls" aria-hidden={!isMounted}>
                <button 
                    type="button" 
                    className="treatment-arrow-btn" 
                    onClick={() => handleArrowNudge('left')}
                    aria-label="Geser ke kiri"
                >
                    &#8592;
                </button>
                <button 
                    type="button" 
                    className="treatment-arrow-btn" 
                    onClick={() => handleArrowNudge('right')}
                    aria-label="Geser ke kanan"
                >
                    &#8594;
                </button>
            </div>
        </div>
    );
};

export default ServiceGrid;