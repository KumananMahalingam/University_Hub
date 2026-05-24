import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Nav from '../components/Nav';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <link rel="stylesheet" href="/index_style.css" />
      <div className="bg-particles">
        <div className="particle" /><div className="particle" /><div className="particle" />
        <div className="particle" /><div className="particle" /><div className="particle" />
      </div>

      <Nav activePage="home" />

      <div className="main-content">
        <div className="left-content">
          <div className="greeting-pill">Hi {user?.name}</div>
          <h1 className="main-title">
            <span className="title-gradient">UniversityHub</span>
          </h1>
          <p className="sub-title">
            Your comprehensive university resource hub. Discover, compare, and plan your educational journey.
          </p>

          <div className="cta-buttons">
            <button className="btn-primary" onClick={() => navigate('/search')}>
              Search Universities
            </button>
            <button className="btn-secondary" onClick={() => navigate('/calculator')}>
              Use Calculator
            </button>
          </div>

          <div className="features-section">
            <h3 className="features-title">What You Can Do</h3>
            <ul className="features-list">
              {[
                'Compare universities side by side',
                'Calculate admission chances',
                'Read student reviews',
                'Explore programs & majors',
                'Check tuition & costs',
                'View campus facilities',
              ].map((f) => (
                <li key={f} className="feature-item">{f}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="right-content">
          <div className="stats-grid">
            {[
              { icon: '🎓', label: 'Universities', value: '4+' },
              { icon: '📚', label: 'Majors',       value: '40+' },
              { icon: '🧮', label: 'Calculators',  value: '10+' },
              { icon: '⭐', label: 'Reviews',      value: '100+' },
              { icon: '💰', label: 'Cost Data',    value: 'Realistic' },
              { icon: '📊', label: 'Insights',     value: 'Live' },
            ].map((s) => (
              <div key={s.label} className="stat-card">
                <span className="stat-icon">{s.icon}</span>
                <div className="stat-label">{s.label}</div>
                <div className="stat-value">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}