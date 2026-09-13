import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="id" data-scroll-behavior="smooth">
            <body>
                <div className="layout">
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
};

export default Layout;