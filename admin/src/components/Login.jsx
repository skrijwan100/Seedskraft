import React, { useState } from 'react';

import { useNavigate } from 'react-router';
export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const naviget=useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };
const handlesubmit=(e)=>{
        e.preventDefault();
        if(form.email==='admin@admin.com' && form.password==='admin123'){
            localStorage.setItem('admin','ksjdjhueyuvfb8uybf78ugifhjsvgjhsacjhgsdfjhuhguiehfi39878fiuehyiuhevuiheuvheuvh')
            naviget("/")
        }
        
}
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f4f6f8'
        }}>
            <div style={{
                background: '#fff',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                borderRadius: 12,
                padding: 32,
                width: '100%',
                maxWidth: 400
            }}>
                <h2 style={{
                    fontSize: 28,
                    fontWeight: 700,
                    marginBottom: 24,
                    textAlign: 'center',
                    color: '#1976d2'
                }}>
                    Login
                </h2>
                <form onSubmit={handlesubmit}>
                    <div style={{ marginBottom: 16 }}>
                        <label
                            htmlFor="email"
                            style={{
                                display: 'block',
                                color: '#333',
                                marginBottom: 8,
                                fontWeight: 500
                            }}
                        >
                            Email
                        </label>
                        <input
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #ccc',
                                borderRadius: 6,
                                outline: 'none',
                                fontSize: 16,
                                boxSizing: 'border-box'
                            }}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            autoComplete="username"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginBottom: 24 }}>
                        <label
                            htmlFor="password"
                            style={{
                                display: 'block',
                                color: '#333',
                                marginBottom: 8,
                                fontWeight: 500
                            }}
                        >
                            Password
                        </label>
                        <input
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #ccc',
                                borderRadius: 6,
                                outline: 'none',
                                fontSize: 16,
                                boxSizing: 'border-box'
                            }}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            background: '#1976d2',
                            color: '#fff',
                            padding: '12px 0',
                            border: 'none',
                            borderRadius: 6,
                            fontSize: 16,
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                        }}
                        onMouseOver={e => e.currentTarget.style.background = '#1565c0'}
                        onMouseOut={e => e.currentTarget.style.background = '#1976d2'}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
