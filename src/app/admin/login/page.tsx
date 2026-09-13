'use client';

import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({ email: username, password });
        if (!error) {
            router.push('/admin');
        } else {
            setError(error.message);
        }
    };

    return (
        <div className="login-container">
            <h1>Admin Login</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
                <div className="form-group">
                        <label htmlFor="username">Email address</label>
                    <input
                        type="email"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;