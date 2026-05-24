import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

const UNIVERSITIES = [
  {
    id: 4,
    name: 'University of Toronto',
    img: '/night.jpg',
    rank: '#1 in Canada',
    badges: ['Ontario', 'Toronto', 'Canada'],
    info1: { label: 'Programs', value: '700+' },
    info2: { label: 'Students', value: '90K+' },
  },
  {
    id: 1,
    name: 'University of Waterloo',
    img: '/orange_city.jpg',
    rank: '#2 Tech Hub',
    badges: ['Ontario', 'Waterloo', 'Canada'],
    info1: { label: 'Co-op', value: "World's Best" },
    info2: { label: 'Students', value: '42K+' },
  },
  {
    id: 2,
    name: 'Western University',
    img: '/purple_city.jpg',
    rank: '#3 Business',
    badges: ['Ontario', 'London', 'Canada'],
    info1: { label: 'Ivey', value: 'Top MBA' },
    info2: { label: 'Students', value: '38K+' },
  },
  {
    id: 3,
    name: "Queen's University",
    img: '/sunset.jpg',
    rank: '#4 Heritage',
    badges: ['Ontario', 'Kingston', 'Canada'],
    info1: { label: 'Founded', value: '1841' },
    info2: { label: 'Students', value: '25K+' },
  },
];

export default function Search() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filtered = UNIVERSITIES.filter((u) => {
    const q = query.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.badges.some((b) => b.toLowerCase().includes(q))
    );
  });

  return (
    <>
      <link rel="stylesheet" href="/search_style.css" />
      <div className="bg-particles">
        {[...Array(5)].map((_, i) => <div key={i} className="particle" />)}
      </div>

      <Nav activePage="search" />

      <div className="container">
        <div className="page-header">
          <h1>Universities in Canada</h1>
          <p className="subtitle">Discover the best universities across Canada</p>
          <div className="search-bar-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search universities, programs, or locations..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {['All', 'Ontario', 'Top Rated', 'Most Affordable'].map((f) => (
            <button key={f} className={`filter-btn${f === 'All' ? ' active' : ''}`}>{f}</button>
          ))}
        </div>

        <div className="cards-wrapper">
          {filtered.map((u) => (
            <div
              key={u.id}
              className="card"
              onClick={() => navigate(`/universities/${u.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-image-wrapper">
                <img src={u.img} alt={u.name} />
                <div className="card-overlay" />
                <div className="rank-badge">{u.rank}</div>
              </div>
              <div className="card-content">
                <div className="university-name">{u.name}</div>
                <div className="badges">
                  {u.badges.map((b) => <span key={b} className="badge">{b}</span>)}
                </div>
              </div>
              <div className="card-footer">
                <div className="info-item">
                  <span className="info-label">{u.info1.label}</span>
                  <span className="info-value">{u.info1.value}</span>
                </div>
                <button className="cta-button">Learn More</button>
                <div className="info-item">
                  <span className="info-label">{u.info2.label}</span>
                  <span className="info-value">{u.info2.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}