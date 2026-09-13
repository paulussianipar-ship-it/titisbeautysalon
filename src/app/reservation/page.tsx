'use client';

import React, { useState } from 'react';
import ReservationForm from '@/components/ReservationForm';
import PremiumSection from '@/components/PremiumSection';

type ReservationData = { name: string; email: string; phone: string; date: string; time: string };

const ReservationPage = () => {
    const [reservationData, setReservationData] = useState<ReservationData | null>(null);

    const handleReservationSubmit = (data: ReservationData) => {
        setReservationData(data);
        localStorage.setItem('reservationData', JSON.stringify(data));
        alert('Reservation successful! We will contact you shortly.');
    };

    return (
        <div className="reservation-page">
            <section className="booking-hero">
                <div className="section-shell booking-hero-inner">
                    <div>
                        <p className="eyebrow">Your time, beautifully held</p>
                        <h1>Book a visit<br /><em>at Titis.</em></h1>
                    </div>
                    <p className="booking-hero-copy">Choose a moment for yourself. We&apos;ll prepare a calm, personal treatment around you.</p>
                </div>
            </section>
            <section className="booking-section section-shell">
                <div className="booking-aside">
                    <p className="eyebrow">A little reset</p>
                    <h2>Come in as you are.<br /><em>Leave feeling renewed.</em></h2>
                    <p>Tell us what you&apos;re looking for and our team will take care of the rest.</p>
                    <div className="booking-note"><span>01</span><p>Appointments are available daily from 09.00 - 20.00 WIB.</p></div>
                    <div className="booking-note"><span>02</span><p>We&apos;ll contact you shortly to confirm your chosen time.</p></div>
                </div>
                <ReservationForm onSubmit={handleReservationSubmit} />
            </section>
            {reservationData && (
                <div className="confirmation section-shell">
                    <span className="confirmation-mark">&#10003;</span>
                    <h2>Reservation Details</h2>
                    <p>{reservationData.name}, your request has been received. We&apos;ll contact you at {reservationData.phone} to confirm.</p>
                </div>
            )}
        </div>
    );
};

export default ReservationPage;