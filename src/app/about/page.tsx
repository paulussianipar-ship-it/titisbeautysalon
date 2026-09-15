import React from 'react';

const AboutPage = () => {
    return (
        <div className="about-page">
            <section className="inner-hero about-hero"><div className="section-shell"><p className="eyebrow">Tentang kami</p><h1>Tentang<br /><em>Kami.</em></h1><p className="inner-hero-copy">Komitmen dan perjalanan Titis Beauty Salon dalam menyediakan solusi kecantikan tepercaya, aman, dan berkualitas untuk Anda.</p></div></section>
            <section className="about-story section-shell">
                <div className="about-gallery" aria-label="Suasana Titis Beauty Salon">
                    <div className="about-img-wrap"><img src="/images/titislogo.jpg" alt="Titis Beauty Salon" loading="lazy" /></div>
                    <div className="about-img-wrap"><img src="/images/facialsteamer.jpeg" alt="Perawatan wajah di Titis Beauty Salon" loading="lazy" /></div>
                    <div className="about-img-wrap"><img src="/images/facialmassage.jpeg" alt="Perawatan massage di Titis Beauty Salon" loading="lazy" /></div>
                </div>
                <div className="about-intro-copy">
                    <p className="eyebrow">Perjalanan kami</p>
                    <h2>Titis Beauty <em>Salon</em></h2>
                    <p>Berdiri sejak tahun 2020 Titis Beauty Salon hadir dengan pesona cantik dan keindahan. Berdedikasi tinggi terhadap nilai-nilai kecantikan, Titis Beauty Salon didukung dengan tenaga ahli yang berpengalaman bekerja di klinik kecantikan selama 13 tahun.</p>
                    <p>Titis Beauty Salon memiliki visi dan misi utama, yakni memberikan kesempatan untuk tampil cantik bagi semua kalangan. Beberapa tahun sudah Titis Beauty Salon berdiri, Titis Beauty Salon hadir di Jatikramat kota Bekasi.</p>
                    <p>Mencantikan seluruh Indonesia adalah misi utama kami, oleh karena itu kami menawarkan beragam treatment kecantikan yang didukung dengan teknologi mutakhir.</p>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;