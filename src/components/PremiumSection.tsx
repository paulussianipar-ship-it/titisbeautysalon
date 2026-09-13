import React from 'react';

const PremiumSection = () => {
    return (
        <section className="premium-section">
            <div className="section-shell premium-layout">
                <div className="premium-copy">
                    <p className="eyebrow">The Titis approach</p>
                    <h2 className="premium-title">A softer way to<br /><em>feel beautiful.</em></h2>
                    <p className="premium-description">Every appointment is a small reset. We pair thoughtful techniques with a calm, intimate space so you can leave feeling lighter, brighter, and completely yourself.</p>
                    <a href="/about" className="text-link">Discover our philosophy <span aria-hidden="true">&#8594;</span></a>
                </div>
                <div className="premium-services">
                    <div className="service-card">
                        <span className="service-number">01</span>
                        <h3>Skin-first care</h3>
                        <p>Rituals tailored to what your skin needs today.</p>
                    </div>
                    <div className="service-card">
                        <span className="service-number">02</span>
                        <h3>Quiet confidence</h3>
                        <p>A warm, unhurried experience from start to finish.</p>
                    </div>
                    <div className="service-card">
                        <span className="service-number">03</span>
                        <h3>Results that glow</h3>
                        <p>Premium products and skilled hands, always.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PremiumSection;