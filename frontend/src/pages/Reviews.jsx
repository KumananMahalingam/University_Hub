import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import { getReviews } from '../services/api';

const UNIVERSITIES = [
  { id: 4, name: 'University of Toronto' },
  { id: 1, name: 'University of Waterloo' },
  { id: 2, name: 'Western University' },
  { id: 3, name: "Queen's University" },
];

export default function Reviews() {
  const [selectedId, setSelectedId]   = useState('');
  const [reviews,    setReviews]      = useState([]);
  const [message,    setMessage]      = useState({ text: '', error: false });
  const navigate = useNavigate();

  const showMessage = (text, error = false) => {
    setMessage({ text, error });
    setTimeout(() => setMessage({ text: '', error: false }), 3000);
  };

  const handleGoToReview = () => {
    if (!selectedId) { showMessage('Please select a university before proceeding.', true); return; }
    navigate(`/review/${selectedId}`);
  };

  const handleViewReviews = async () => {
    if (!selectedId) { showMessage('Please select a university to view reviews.', true); return; }
    try {
      const res = await getReviews(selectedId);
      setReviews(res.data);
    } catch {
      showMessage('Error fetching reviews.', true);
    }
  };

  return (
    <>
      <link rel="stylesheet" href="/review_style.css" />
      <Nav activePage="review" />

      <div className="container">
        <h1>Review Your University</h1>

        <form id="reviewForm" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="university_select">Choose a University:</label>
            <select
              id="university_select"
              value={selectedId}
              onChange={(e) => { setSelectedId(e.target.value); setReviews([]); }}
            >
              <option value="">--Please choose an option--</option>
              {UNIVERSITIES.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="button" className="button" style={{ width: '50%' }}
                    onClick={handleGoToReview}>
              Go to Review Page
            </button>
            <button type="button" className="button" style={{ width: '50%' }}
                    onClick={handleViewReviews}>
              View Reviews
            </button>
          </div>
        </form>

        {message.text && (
          <div
            className="message-box"
            style={{
              display: 'block',
              backgroundColor: message.error ? '#ffcccc' : '#ccffcc',
              color:           message.error ? '#ff0000' : '#006600',
            }}
          >
            {message.text}
          </div>
        )}

        {reviews.length > 0 && (
          <div className="reviews-container">
            {reviews.map((r) => (
              <div key={r.id} className="review-box">
                <div className="rating-grid">
                  {[
                    ['Overall',   r.rating],
                    ['Academics', r.academicsRating],
                    ['Safety',    r.safetyRating],
                    ['Partying',  r.partySceneRating],
                    ['Food',      r.foodRating],
                    ['Location',  r.locationRating],
                  ].map(([label, val]) => (
                    <div key={label} className="rating-item">
                      <strong>{label}:</strong>{' '}
                      <span className="rating-value">{val} ⭐</span>
                    </div>
                  ))}
                </div>
                <div className="comment-section">
                  <strong>Comment:</strong>
                  <p>{r.body || 'No comment provided.'}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {reviews.length === 0 && selectedId && message.text === '' && (
          <div className="reviews-container">
            <p>No reviews available for this university yet.</p>
          </div>
        )}
      </div>
    </>
  );
}