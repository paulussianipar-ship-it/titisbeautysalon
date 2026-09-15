import React from 'react';
import HeroSlider from '../components/HeroSlider';
import ServiceGrid from '../components/ServiceGrid';
import PremiumSection from '../components/PremiumSection';

const HomePage = () => {
    return (
        <div className="home-page">
            <HeroSlider />
            {/* <PremiumSection /> */}
            <section id="treatment-list" className="treatment-section">
                <div className="container">
                    <div className="text-center mb-4">
                        <h2 className="treatment-heading">Treatment Kami</h2>
                        <p className="treatment-desc">Temukan perawatan terbaik yang dirancang khusus untuk kebutuhan kecantikan Anda</p>
                    </div>

                    <ServiceGrid />

                    <div className="text-center mt-4 pt-2">
                        <a href="/services" className="link-view-all">Lainnya <span aria-hidden="true">→</span></a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;