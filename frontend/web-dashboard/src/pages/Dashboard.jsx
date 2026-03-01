import React, { useState, useEffect } from 'react';

const Sidebar = () => (
    <div className="sidebar">
        <div className="logo-container">
            <div className="logo-box">A</div>
            <span className="logo-text">MyArogya</span>
        </div>
        <nav className="nav-menu">
            <a href="#" className="nav-item active">📊 Dashboard</a>
            <a href="#" className="nav-item">📅 Appointments</a>
            <a href="#" className="nav-item">👨‍⚕️ Doctors</a>
            <a href="#" className="nav-item">📁 Lab Reports</a>
            <a href="#" className="nav-item">🏢 Clinics</a>
            <a href="#" className="nav-item">🔐 Security</a>
        </nav>
    </div>
);

const StatCard = ({ label, value, trend, type }) => (
    <div className="stat-card">
        <div className="stat-label">{label}</div>
        <div className="stat-value">
            {value}
            <span className={`stat-trend ${type}`}>{trend}</span>
        </div>
    </div>
);

const ApptTable = () => {
    const [appointments, setAppointments] = useState([
        { id: 1, patient: 'Mukund Kumar', doctor: 'Dr. Sharma', time: '10:30 AM', status: 'Active', type: 'General' },
        { id: 2, patient: 'Priya Verma', doctor: 'Dr. Reddy', time: '11:15 AM', status: 'Pending', type: 'Cardio' },
        { id: 3, patient: 'Rahul Singh', doctor: 'Dr. Gupta', time: '12:00 PM', status: 'Cancelled', type: 'Dental' },
        { id: 4, patient: 'Anjali Das', doctor: 'Dr. Sharma', time: '02:30 PM', status: 'Active', type: 'Ortho' },
    ]);

    return (
        <div className="data-card">
            <div className="section-title">
                Upcoming Consultations
                <button className="btn btn-primary">View All</button>
            </div>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Specialization</th>
                        <th>Booking Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appt => (
                        <tr key={appt.id}>
                            <td><strong>{appt.patient}</strong></td>
                            <td>{appt.doctor}</td>
                            <td>{appt.type}</td>
                            <td>{appt.time}</td>
                            <td>
                                <span className={`status-badge status-${appt.status.toLowerCase()}`}>
                                    {appt.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const Dashboard = () => {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="main-content">
                <header className="header">
                    <div>
                        <h1 style={{ fontSize: '28px', fontWeight: '700' }}>Welcome back, Administrator</h1>
                        <p style={{ color: '#64748B', marginTop: '4px' }}>Monitor your healthcare network in real-time.</p>
                    </div>
                    <div className="user-profile">
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: '700', fontSize: '15px' }}>Mukund Kumar</div>
                            <div style={{ fontSize: '12px', color: '#64748B' }}>Senior Java Architect • 7+ Years Experience</div>
                        </div>
                        <div className="avatar" style={{ backgroundColor: '#E1E9FF', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: '#0062FF' }}>MK</div>
                    </div>
                </header>

                <section className="stats-grid">
                    <StatCard label="Total Appointments" value="1,284" trend="+12.4%" type="up" />
                    <StatCard label="Active Doctors" value="48" trend="+2" type="up" />
                    <StatCard label="Satisfaction Rate" value="98.2%" trend="+0.5%" type="up" />
                    <StatCard label="Monthly Revenue" value="₹8.4L" trend="-2.1%" type="down" />
                </section>

                <ApptTable />

                <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div className="data-card">
                        <div className="section-title">Health Analytics</div>
                        <div style={{ height: '200px', background: '#F8FAFC', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', fontSize: '14px' }}>
                            Real-time traffic visualizer pending connection...
                        </div>
                    </div>
                    <div className="data-card">
                        <div className="section-title">Clinic Distribution</div>
                        <div style={{ height: '200px', background: '#F8FAFC', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', fontSize: '14px' }}>
                            Geographic heatmap pending connection...
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
