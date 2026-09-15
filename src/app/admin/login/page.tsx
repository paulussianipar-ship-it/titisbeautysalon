'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

const LoginPage: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Redirect if already logged in
    useEffect(() => {
        const checkExistingSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    router.replace('/admin');
                }
            } catch {
                // Ignore session lookup error and show login form
            }
        };

        void checkExistingSession();
    }, [router]);

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const { data, error: signInError } = await supabase.auth.signInWithPassword({ 
                email: email.trim(), 
                password 
            });

            if (signInError) {
                if (signInError.message.toLowerCase().includes('invalid login credentials')) {
                    setError('Email atau kata sandi yang Anda masukkan salah. Silakan coba lagi.');
                } else if (signInError.message.toLowerCase().includes('email not confirmed')) {
                    setError('Email belum dikonfirmasi. Periksa kotak masuk email Anda.');
                } else {
                    setError(signInError.message);
                }
                setIsLoading(false);
                return;
            }

            if (data?.session) {
                router.replace('/admin');
                router.refresh();
            } else {
                router.replace('/admin');
            }
        } catch {
            setError('Terjadi kendala koneksi ke server. Silakan periksa jaringan internet Anda.');
            setIsLoading(false);
        }
    };

    return (
        <div className="admin-login-wrapper">
            {/* Top Bar with Back Link and Security Badge */}
            <header className="admin-login-topbar">
                <Link href="/" className="admin-login-back-btn">
                    <span aria-hidden="true">&larr;</span>
                    <span>Kembali ke Website</span>
                </Link>
                <div className="admin-login-security-tag">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <span>Enkripsi SSL Aman</span>
                </div>
            </header>

            {/* Main Centered Login Card */}
            <main className="admin-login-main">
                <div className="admin-login-card">
                    {/* Header */}
                    <div className="admin-login-header">
                        <div className="admin-login-logo-wrap">
                            <img 
                                src="/images/titislogo.jpg" 
                                alt="Titis Beauty Aesthetic Logo" 
                                className="admin-login-logo" 
                                width="1462" 
                                height="886" 
                            />
                        </div>
                        <div className="admin-login-brand-meta">
                            <strong>TITIS</strong>
                            <small>Beauty Aesthetic</small>
                        </div>
                        <h1 className="admin-login-title">Admin Portal</h1>
                        <p className="admin-login-subtitle">
                            Silakan masuk dengan akun staf atau pengelola klinik untuk mengakses dashboard manajemen.
                        </p>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="admin-login-error" role="alert">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="12" y1="8" x2="12" y2="12"/>
                                <line x1="12" y1="16" x2="12.01" y2="16"/>
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleLogin} className="admin-login-form" noValidate>
                        <div className="admin-field-group">
                            <label htmlFor="admin-email" className="admin-field-label">
                                Email Administrator
                            </label>
                            <div className="admin-input-wrap">
                                <span className="admin-input-icon" aria-hidden="true">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                        <polyline points="22,6 12,13 2,6"/>
                                    </svg>
                                </span>
                                <input
                                    type="email"
                                    id="admin-email"
                                    className="admin-input"
                                    placeholder="nama@titisbeautysalon.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className="admin-field-group">
                            <div className="admin-field-header">
                                <label htmlFor="admin-password" className="admin-field-label">
                                    Kata Sandi
                                </label>
                            </div>
                            <div className="admin-input-wrap">
                                <span className="admin-input-icon" aria-hidden="true">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                    </svg>
                                </span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="admin-password"
                                    className="admin-input admin-input-password"
                                    placeholder="Masukkan kata sandi..."
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    required
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    className={`admin-password-toggle ${showPassword ? 'is-active' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setShowPassword((prev) => !prev);
                                    }}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    title={showPassword ? 'Sembunyikan kata sandi' : 'Lihat kata sandi'}
                                    aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Lihat kata sandi'}
                                    aria-pressed={showPassword}
                                >
                                    {showPassword ? (
                                        /* Eye open - active state, password is visible */
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    ) : (
                                        /* Eye with slash - password is hidden */
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="admin-login-submit-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="admin-btn-spinner" aria-hidden="true" />
                                    <span>Memverifikasi Akun...</span>
                                </>
                            ) : (
                                <>
                                    <span>Masuk ke Dashboard</span>
                                    <span aria-hidden="true" className="admin-btn-arrow">&rarr;</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer Info */}
                    <div className="admin-login-footer">
                        <p className="admin-login-help">
                            Lupa kata sandi atau butuh akses akun baru? Hubungi{' '}
                            <a 
                                href="https://wa.me/6285175089198?text=Halo%20Admin%20Titis%2C%20saya%20memerlukan%20bantuan%20akses%20login%20portal%20admin" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                WhatsApp Bantuan
                            </a>
                        </p>
                        <div className="admin-login-copyright">
                            &copy; {new Date().getFullYear()} Titis Beauty Aesthetic &bull; Hak Akses Terbatas
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;