import React from 'react';
import ServiceGrid from '@/components/ServiceGrid';
const ServicesPage = () => {
    return (
        <div className="services-page">
            <section className="inner-hero services-hero"><div className="section-shell"><p className="eyebrow">Treatments by Titis</p><h1>Small rituals,<br /><em>beautiful results.</em></h1><p className="inner-hero-copy">Explore our edit of skin and body treatments, designed to leave you feeling refreshed, cared for, and completely yourself.</p></div></section>
            <section className="services-list section-shell"><div className="section-heading"><div><p className="eyebrow">The treatment menu</p><h2>Choose your<br /><em>moment.</em></h2></div><p className="section-intro">Every service is delivered with attention, patience, and a little room to exhale.</p></div><ServiceGrid /></section>
        </div>
    );
};

export default ServicesPage;