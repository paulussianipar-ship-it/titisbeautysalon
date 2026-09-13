import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-main section-shell">
                <div>
                    <p className="eyebrow">Come as you are</p>
                    <h2>Your best skin day<br />starts here.</h2>
                </div>
                <div className="footer-contact">
                    <p>Jl. H. Abdullah No. 77, Jatikramat<br />Jatiasih, Bekasi 17421</p>
                    <a href="tel:+6285175089198">0851-75089198 (WA) <span aria-hidden="true">&#8599;</span></a>
                    <a href="https://www.google.com/maps/search/?api=1&query=titis+beauty+aesthetic" target="_blank" rel="noopener noreferrer">Find us on Maps <span aria-hidden="true">&#8599;</span></a>
                </div>
            </div>
            <div className="footer-bottom section-shell">
                <span>&copy; {new Date().getFullYear()} Titis Beauty Salon</span>
                <span>Beauty, with intention.</span>
                <Link href="/admin/login" className="footer-admin-login">Admin login <span aria-hidden="true">&#8599;</span></Link>
            </div>
        </footer>
    );
};

export default Footer;