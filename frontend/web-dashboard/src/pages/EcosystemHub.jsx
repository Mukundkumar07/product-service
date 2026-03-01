import React from 'react';

const EcosystemHub = () => {
    const platforms = [
        {
            title: 'Patient Mobile App',
            desc: 'React Native application for booking, reports, and OTP login.',
            status: 'Ready',
            port: 'EXPO/Native',
            color: '#7C4DFF',
            icon: '📱'
        },
        {
            title: 'Doctor & Admin Portal',
            desc: 'Full-featured dashboard for managing consultations and analytics.',
            status: 'Live',
            port: '3000',
            color: '#0062FF',
            icon: '👨‍⚕️',
            link: '#dashboard'
        },
        {
            title: 'API Gateway',
            desc: 'Centralized request routing and security layer.',
            status: 'Active',
            port: '8080',
            color: '#00D1C1',
            icon: '🌐',
            link: 'http://localhost:8080/api/doctors'
        },
        {
            title: 'Platform Discovery',
            desc: 'Eureka dashboard monitoring all microservices health.',
            status: 'Online',
            port: '8761',
            color: '#10B981',
            icon: '📡',
            link: 'http://localhost:8761'
        }
    ];

    const services = [
        'Auth Service', 'Doctor Service', 'Appointment Service',
        'File Service', 'Notification Service', 'Payment Service', 'AI Service'
    ];

    return (
        <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', padding: '60px 20px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                {/* Header */}
                <header style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '15px',
                        background: 'white', padding: '10px 25px', borderRadius: '40px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.05)', marginBottom: '30px'
                    }}>
                        <div style={{ width: '35px', height: '35px', background: '#0062FF', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold' }}>A</div>
                        <span style={{ fontWeight: '700', fontSize: '18px', color: '#0062FF', fontFamily: 'Outfit' }}>MyArogya Ecosystem</span>
                    </div>
                    <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#0F172A', fontFamily: 'Outfit', letterSpacing: '-1px' }}>
                        Unified Health <span style={{ color: '#0062FF' }}>Command Center</span>
                    </h1>
                    <p style={{ fontSize: '18px', color: '#64748B', maxWidth: '600px', margin: '20px auto' }}>
                        The complete infrastructure of your Arogya-style platform is now live and synchronized.
                    </p>
                </header>

                {/* Main Hub Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '60px' }}>
                    {platforms.map((p, i) => (
                        <div key={i} style={{
                            background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid #E5EAF1',
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div style={{ fontSize: '40px', marginBottom: '20px' }}>{p.icon}</div>
                            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', fontFamily: 'Outfit' }}>{p.title}</h3>
                            <p style={{ color: '#64748B', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>{p.desc}</p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{
                                    background: p.color + '15', color: p.color,
                                    padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700'
                                }}>PORT {p.port}</span>
                                <a href={p.link || '#'} style={{
                                    textDecoration: 'none', color: '#0F172A', fontWeight: '600', fontSize: '14px',
                                    display: 'flex', alignItems: 'center', gap: '5px'
                                }}>Open Center →</a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* System Health Section */}
                <div style={{ background: '#0F172A', borderRadius: '32px', padding: '40px', color: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                        <div>
                            <h2 style={{ fontSize: '24px', fontWeight: '700', fontFamily: 'Outfit' }}>Backend Cluster Health</h2>
                            <p style={{ color: '#94A3B8', fontSize: '14px', marginTop: '5px' }}>7 Microservices communicating via Eureka Discovery</p>
                        </div>
                        <div style={{ background: '#10B981', color: 'white', padding: '8px 20px', borderRadius: '40px', fontSize: '14px', fontWeight: '700' }}>
                            ● 100% OPERATIONAL
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px' }}>
                        {services.map((s, i) => (
                            <div key={i} style={{
                                background: 'rgba(255,255,255,0.05)', padding: '15px 20px', borderRadius: '16px',
                                border: '1px solid rgba(255,255,255,0.1)', fontSize: '14px', fontWeight: '500',
                                display: 'flex', alignItems: 'center', gap: '10px'
                            }}>
                                <div style={{ width: '8px', height: '8px', background: '#10B981', borderRadius: '50%' }}></div>
                                {s}
                            </div>
                        ))}
                    </div>
                </div>

                <footer style={{ textAlign: 'center', marginTop: '60px', color: '#64748B', fontSize: '14px' }}>
                    MyArogya Platform v1.0 Production Edition • Mukund Kumar
                </footer>

            </div>
        </div>
    );
};

export default EcosystemHub;
