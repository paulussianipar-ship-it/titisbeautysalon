import React from 'react';
import HeroSlider from '../components/HeroSlider';
import ServiceGrid from '../components/ServiceGrid';
import PremiumSection from '../components/PremiumSection';

const HomePage = () => {
    return (
        <div className="home-page">
            <HeroSlider />
            <PremiumSection />
            <section className="services-section section-shell" id="services">
                <div className="section-heading">
                    <div>
                        <p className="eyebrow">Rituals for your glow</p>
                        <h2>Beauty, made personal.</h2>
                    </div>
                    <p className="section-intro">Thoughtful treatments, gentle hands, and a little more time for yourself.</p>
                </div>
                <ServiceGrid />
            </section>
        </div>
    );
};

export default HomePage;