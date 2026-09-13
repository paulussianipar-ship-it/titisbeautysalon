import React from 'react';

const AboutPage = () => {
    return (
        <div className="about-page">
            <section className="inner-hero about-hero"><div className="section-shell"><p className="eyebrow">The Titis story</p><h1>Beauty care,<br /><em>made personal.</em></h1><p className="inner-hero-copy">A calm, considered space in Bekasi for rituals that bring out your most confident self.</p></div></section>
            <section className="about-intro section-shell"><div className="about-intro-label"><span className="section-index">01</span><span>Our approach</span></div><div className="about-intro-copy"><h2>Care that begins<br /><em>with listening.</em></h2><p>At Titis Beauty Aesthetic, every visit starts with understanding what your skin needs and how you want to feel when you leave. We create thoughtful treatments in a warm, unhurried environment.</p><p>From a quiet facial to a complete skin ritual, our professional beauticians pair gentle technique with carefully selected products. The result is beauty care that feels as good as it looks.</p></div></section>
            <section className="about-values"><div className="section-shell"><p className="eyebrow">What matters to us</p><div className="value-grid"><article><span>01</span><h3>Personal</h3><p>Your routine, your pace, your treatment plan.</p></article><article><span>02</span><h3>Intentional</h3><p>Simple rituals chosen to make a visible difference.</p></article><article><span>03</span><h3>Restorative</h3><p>A softer kind of luxury, made for real life.</p></article></div></div></section>
        </div>
    );
};

export default AboutPage;