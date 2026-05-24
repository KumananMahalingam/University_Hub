import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Nav from '../components/Nav';
import CostBar from '../components/CostBar';
import { getUniversity } from '../services/api';

const UNIVERSITY_NAMES = {
  1: 'University of Waterloo',
  2: 'Western University',
  3: "Queen's University",
  4: 'University of Toronto',
};

function formatCurrency(str) {
  if (!str) return 'N/A';
  const s = String(str);
  const fmt = (n) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD',
      minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(n);
  if (!s.includes('-')) return fmt(parseInt(s.replace(/\D/g, ''), 10));
  const [min, max] = s.split('-').map((v) => parseInt(v.trim(), 10));
  return `${fmt(min)} – ${fmt(max)}`;
}

export default function University() {
  const { id }           = useParams();
  const [data, setData]  = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getUniversity(id)
      .then((res) => setData(res.data))
      .catch(() => setError('Failed to load university data.'));
  }, [id]);

  if (error) return <p style={{ color: 'white', padding: '40px' }}>{error}</p>;
  if (!data)  return <p style={{ color: 'white', padding: '40px' }}>Loading...</p>;

  const uniName = UNIVERSITY_NAMES[Number(id)] || data.universityName;

  const ratingCards = [
    { label: 'Overall',       val: data.overallRating },
    { label: 'Academics',     val: data.academicsRating },
    { label: 'Safety',        val: data.safetyRating },
    { label: 'Partying',      val: data.partyRating },
    { label: 'Food',          val: data.foodRating },
    { label: 'Location',      val: data.locationRating },
    { label: 'Happiness',     val: data.happinessRating },
    { label: 'Affordability', val: data.affordabilityRating },
    { label: 'Employability', val: data.employabilityRating },
  ];

  return (
    <>
      <link rel="stylesheet" href="/university_search_subpages_style.css" />

      <Nav activePage="search" />

      <div className="container-wrapper">
        <h1>{uniName}</h1>
        <Link to="/search" className="back-link">Back to Universities</Link>

        {/* Quick Facts */}
        <div className="uni-info-box">
          <h2>Quick Facts</h2>
          <div className="info-grid">
            <div className="info-item">
              <h3>Avg. Admission</h3>
              <p>{data.admissionAverage ?? 'N/A'}%</p>
            </div>
            <div className="info-item">
              <h3>Avg. Cost</h3>
              <p>{formatCurrency(data.averageCost)}</p>
            </div>
            <div className="info-item">
              <h3>Graduation Rate</h3>
              <p>{data.gradRate ?? 'N/A'}</p>
            </div>
            <div className="info-item">
              <h3>Website</h3>
              <a href={data.websiteUrl} target="_blank" rel="noreferrer"
                 style={{ color: '#673ab7', fontWeight: 600, textDecoration: 'none' }}>
                {uniName}
              </a>
            </div>
          </div>
        </div>

        {/* Student Ratings */}
        <div className="uni-info-box">
          <h2>Student Ratings</h2>
          <div className="ratings-grid">
            {ratingCards.map(({ label, val }) => (
              <div key={label} className="mini-rating-card">
                <h3>{label}</h3>
                <p>{val ?? 'N/A'}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Admissions */}
        <div className="uni-info-box">
          <h2>Admissions</h2>
          <div className="admissions-grid">
            <div className="important-info-card">
              <h3>Application Deadline</h3>
              <p>{data.applicationDeadline ?? 'N/A'}</p>
            </div>
            <div className="important-info-card">
              <h3>Overall Average</h3>
              <p>{data.overallAverage ?? 'N/A'}%</p>
            </div>
          </div>
          <ul>
            <li>
              <strong>Application Fee:</strong>{' '}
              <span className="green-pill">{formatCurrency(data.applicationFee)}</span>
            </li>
            <li>
              <strong>Application Website:</strong>{' '}
              <a href={data.websiteUrl} target="_blank" rel="noreferrer"
                 style={{ color: '#673ab7', fontWeight: 600, textDecoration: 'none' }}>
                {uniName}
              </a>
            </li>
            <li>
              <strong>Supplementary Application:</strong>{' '}
              {data.supplementaryApplication ?? 'N/A'}
            </li>
          </ul>
        </div>

        {/* Cost of Living */}
        <div className="uni-info-box">
          <h2>Cost of Living</h2>
          <ul>
            <CostBar label="Average Cost:"               value={data.averageCost} />
            {data.booksSupplies &&
              <CostBar label="Books & Supplies:"         value={data.booksSupplies} />}
            <CostBar label="Average Housing Cost:"       value={data.averageHousingCost} />
            <CostBar label="Average Meal Plan Cost:"     value={data.averageMealPlanCost} />
            <CostBar label="Average Domestic Tuition:"   value={data.averageDomesticTuition} />
            <CostBar label="Average International Tuition:" value={data.averageInternationalCost} />
          </ul>
        </div>

        {/* Popular Majors */}
        <div className="uni-info-box">
          <h2>Popular Majors</h2>
          <ul>
            {(data.popularMajors ?? []).map((m) => <li key={m}>{m}</li>)}
          </ul>
        </div>

        {/* Residences */}
        <div className="uni-info-box">
          <h2>Residences</h2>
          <div className="residence-grid residence-grid-header">
            <span>Name</span><span>Room Type</span>
            <span>Capacity</span><span>Price Range</span><span>Rating</span>
          </div>
          {(data.residences ?? []).map((r) => (
            <div key={r.name} className="residence-grid residence-grid-row">
              <span>{r.name}</span>
              <span>{r.roomType}</span>
              <span>{r.capacity}</span>
              <span>{formatCurrency(r.priceRange)}</span>
              <span><span className="rating-pill">{r.rating}</span></span>
            </div>
          ))}
        </div>

        {/* Post-Graduation */}
        <div className="uni-info-box">
          <h2>Post-Graduation</h2>
          <ul>
            <li><strong>Graduation Rate:</strong> {data.gradRate}</li>
            <li><strong>Employment Rate:</strong> {data.employmentRate}</li>
            <li><strong>Median Income:</strong>   {formatCurrency(data.medianIncome)}</li>
          </ul>
        </div>
      </div>
    </>
  );
}