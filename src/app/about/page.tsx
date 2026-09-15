import React from 'react';

const AboutPage = () => {
    return (
        <div className="about-page">
            <section className="page-hero about-hero">
                <div className="section-shell">
                    <h1>Tentang Kami</h1>
                    <p className="page-hero-subtitle">Komitmen dan perjalanan Titis Beauty Salon dalam menyediakan solusi kecantikan tepercaya, aman, dan berkualitas untuk Anda.</p>
                </div>
            </section>
            <section className="about-gallery-section section-shell" aria-label="Suasana Titis Beauty Salon">
                <div className="about-gallery about-gallery-desktop">
                    <div className="about-img-wrap"><img src="/images/titislogo.jpg" alt="Titis Beauty Salon" loading="lazy" /></div>
                    <div className="about-img-wrap"><img src="/images/facialsteamer.jpeg" alt="Perawatan wajah di Titis Beauty Salon" loading="lazy" /></div>
                    <div className="about-img-wrap"><img src="/images/facialmassage.jpeg" alt="Perawatan massage di Titis Beauty Salon" loading="lazy" /></div>
                </div>
                <div className="about-gallery-mobile">
                    <div className="about-gallery-track">
                        <div className="about-img-wrap"><img src="/images/titislogo.jpg" alt="Titis Beauty Salon" loading="lazy" /></div>
                        <div className="about-img-wrap"><img src="/images/facialsteamer.jpeg" alt="Perawatan wajah di Titis Beauty Salon" loading="lazy" /></div>
                        <div className="about-img-wrap"><img src="/images/facialmassage.jpeg" alt="Perawatan massage di Titis Beauty Salon" loading="lazy" /></div>
                    </div>
                    <div className="about-gallery-pagination" aria-hidden="true"><span className="active" /><span /><span /></div>
                </div>
            </section>
            <section className="about-story section-shell">
                <div className="about-intro-copy">
                    <h2>Titis Beauty Salon</h2>
                    <p>Berdiri sejak tahun 2020 Titis Beauty Salon hadir dengan pesona cantik dan keindahan. Berdedikasi tinggi terhadap nilai-nilai kecantikan, Titis Beauty Salon didukung dengan tenaga ahli yang berpengalaman bekerja di klinik kecantikan selama 13 tahun.</p>
                    <p>Titis Beauty Salon memiliki visi dan misi utama, yakni memberikan kesempatan untuk tampil cantik bagi semua kalangan. Beberapa tahun sudah Titis Beauty Salon berdiri, Titis Beauty Salon hadir di Jatikramat kota Bekasi.</p>
                    <p>Mencantikan seluruh Indonesia adalah misi utama kami, oleh karena itu kami menawarkan beragam treatment kecantikan yang didukung dengan teknologi mutakhir.</p>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;