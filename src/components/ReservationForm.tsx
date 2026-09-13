'use client';

import React, { FormEvent, useState } from 'react';

type ReservationFormData = { name: string; email: string; phone: string; date: string; time: string; service: string };
type ReservationFormProps = { onSubmit?: (data: ReservationFormData) => void };

const playNotificationTone = () => {
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const now = audioContext.currentTime;

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(660, now);
    oscillator.frequency.setValueAtTime(880, now + 0.12);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.45);
    oscillator.addEventListener('ended', () => void audioContext.close());
};

const ReservationForm = ({ onSubmit }: ReservationFormProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [service, setService] = useState('');
    const [notification, setNotification] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const reservation = {
            name,
            email,
            phone,
            date,
            time,
            service,
        };
        onSubmit?.(reservation);
        localStorage.setItem('reservation', JSON.stringify(reservation));
        const whatsappMessage = [
            'Halo Titis Beauty Aesthetic, saya ingin melakukan reservasi.',
            '',
            `Nama: ${name}`,
            `Email: ${email}`,
            `Nomor WhatsApp: ${phone}`,
            `Treatment: ${service}`,
            `Tanggal: ${date}`,
            `Jam: ${time}`,
        ].join('\n');
        window.open(`https://wa.me/6285175089198?text=${encodeURIComponent(whatsappMessage)}`, '_blank', 'noopener,noreferrer');
        window.dispatchEvent(new CustomEvent('reservation-created'));
        playNotificationTone();
        setNotification('Reservation sent. WhatsApp is ready for confirmation.');
        window.setTimeout(() => setNotification(''), 5000);
        resetForm();
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setDate('');
        setTime('');
        setService('');
    };

    return (
        <div className="reservation-form">
            {notification && (
                <div className="web-notification" role="status" aria-live="polite">
                    <span className="web-notification-icon" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                            <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                        </svg>
                    </span>
                    <span>{notification}</span>
                    <button type="button" aria-label="Close notification" onClick={() => setNotification('')}>&times;</button>
                </div>
            )}
            <div className="form-heading">
                <span className="form-step">01 / 01</span>
                <h2>Reserve your moment</h2>
                <p>Share a few details and we&apos;ll take it from here.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="reservation-name">Your name</label>
                    <input
                        type="text"
                        id="reservation-name"
                        placeholder="e.g. Aulia Putri"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="reservation-email">Email address</label>
                    <input
                        type="email"
                        id="reservation-email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="reservation-phone">WhatsApp number</label>
                    <input
                        type="tel"
                        id="reservation-phone"
                        placeholder="0851 7508 9198"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className="form-row">
                <div className="form-field">
                    <label htmlFor="reservation-date">Preferred date</label>
                    <input
                        type="date"
                        id="reservation-date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                </div>
                <div className="form-row">
                <div className="form-field">
                    <label htmlFor="reservation-time">Preferred time</label>
                    <input
                        type="time"
                        id="reservation-time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>
                </div>
                <div className="form-field">
                    <label htmlFor="reservation-service">Choose your treatment</label>
                    <select
                        id="reservation-service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        required
                    >
                        <option value="">Select a service</option>
                        <option value="Cleanser Milk">Cleanser Milk</option>
                        <option value="Steamer">Steamer</option>
                        <option value="Ekstrasi Komedo">Ekstrasi Komedo</option>
                        <option value="Massage">Massage</option>
                        <option value="Facial Wash">Facial Wash</option>
                        <option value="Serum">Serum</option>
                        <option value="Uap Dingin">Uap Dingin</option>
                        <option value="Masker Wajah">Masker Wajah</option>
                        <option value="Oxygen">Oxygen</option>
                    </select>
                </div>
                <button type="submit">Request appointment <span aria-hidden="true">&#8599;</span></button>
            </form>
        </div>
    );
};

export default ReservationForm;