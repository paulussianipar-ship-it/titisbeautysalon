import React from 'react';

const ContactPage = () => {
    return (
        <div className="contact-page">
            <section className="inner-hero contact-hero"><div className="section-shell"><p className="eyebrow">Come by anytime</p><h1>Let&apos;s make time<br /><em>for you.</em></h1><p className="inner-hero-copy">Questions, bookings, or simply want to know more? We&apos;d love to hear from you.</p></div></section>
            <section className="contact-content section-shell">
                <div className="contact-details">
                    <div className="contact-detail"><span className="contact-label">Visit</span><p>Jl. H. Abdullah No. 77<br />Jatikramat, Jatiasih<br />Bekasi 17421</p><a href="https://maps.app.goo.gl/Yx8D1t9GR5SX4bmBA" target="_blank" rel="noopener noreferrer">Open in Maps <span aria-hidden="true">&#8599;</span></a></div>
                    <div className="contact-detail"><span className="contact-label">Talk to us</span><p>Monday - Sunday<br />09.00 - 20.00 WIB</p><a href="tel:+6285175089198">0851-75089198 (WA) <span aria-hidden="true">&#8599;</span></a></div>
                </div>
                <div className="map">
                    <div className="map-heading"><p className="eyebrow">Find your way here</p><h2>See you<br /><em>at Titis.</em></h2></div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.9395156001583!2d106.94325737585393!3d-6.271684493717054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698d310ab08e55%3A0xf29a313db5083484!2sTitis%20Beauty%20Aesthetic!5e0!3m2!1sid!2sid!4v1789467958984!5m2!1sid!2sid"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;