import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Nav from '../components/Nav';
import StarRating from '../components/StarRating';
import { useAuth } from '../context/AuthContext';
import { submitReview } from '../services/api';

const UNIVERSITIES = {
  1: 'University of Waterloo',
  2: 'Western University',
  3: "Queen's University",
  4: 'University of Toronto',
};

const RATING_FIELDS = [
  { name: 'overall',      label: 'Overall' },
  { name: 'academics',    label: 'Academics' },
  { name: 'food',         label: 'Food' },
  { name: 'safety',       label: 'Safety' },
  { name: 'party',        label: 'Party Scene' },
  { name: 'student_life', label: 'Student Life' },
  { name: 'location',     label: 'Location' },
];

export default function ReviewForm() {
  const { id }     = useParams();
  const { user }   = useAuth();
  const universityName = UNIVERSITIES[Number(id)] || 'Unknown University';

  const [ratings, setRatings] = useState({
    overall: 0, academics: 0, food: 0,
    safety: 0, party: 0, student_life: 0, location: 0,
  });
  const [reviewText, setReviewText] = useState('');
  const [status,     setStatus]     = useState({ type: '', message: '' });

  const handleRatingChange = (name, value) =>
    setRatings((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    const missing = RATING_FIELDS.filter((f) => !ratings[f.name]);
    if (missing.length) {
      setStatus({ type: 'error', message: `Please rate: ${missing.map(f => f.label).join(', ')}` });
      return;
    }

    const payload = {
      user_id:            user.id,
      university_id:      Number(id),
      rating:             ratings.overall,
      body:               reviewText,
      academics_rating:   ratings.academics,
      food_rating:        ratings.food,
      safety_rating:      ratings.safety,
      party_scene_rating: ratings.party,
      student_life_rating: ratings.student_life,
      location_rating:    ratings.location,
    };

    try {
      await submitReview(payload);
      alert('Review submitted successfully!');
      setRatings({ overall: 0, academics: 0, food: 0, safety: 0, party: 0, student_life: 0, location: 0 });
      setReviewText('');
    } catch {
      setStatus({ type: 'error', message: 'Failed to submit review. Please try again.' });
    }
  };

  return (
    <>
      <link rel="stylesheet" href="/reviewForm_style.css" />
      {/* Font Awesome for star icons fallback */}
      <link rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      <Nav activePage="review" />

      <div className="container">
        <h1>Leave a Review for {universityName}</h1>

        <form onSubmit={handleSubmit}>
          <div className="rating-group">
            {RATING_FIELDS.map((f) => (
              <StarRating
                key={f.name}
                name={f.name}
                label={f.label}
                value={ratings[f.name]}
                onChange={handleRatingChange}
              />
            ))}
          </div>

          <label>Your Review:</label>
          <textarea
            name="review"
            rows={4}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />

          <button type="submit" className="button">Submit Review</button>
        </form>

        {status.message && (
          <div className={`status-message ${status.type}`}>
            {status.message}
          </div>
        )}
      </div>
    </>
  );
}