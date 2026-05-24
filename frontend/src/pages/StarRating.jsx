import React, { useState } from 'react';

export default function StarRating({ name, label, value, onChange }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="rating-item">
      <label>{label}</label>
      <div className="stars" style={{ flexDirection: 'row', gap: '4px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className="fas fa-star"
            style={{
              fontSize: '1.8rem',
              cursor: 'pointer',
              color: star <= (hovered || value) ? '#fbbf24' : '#e0e0e0',
              transition: 'color 0.15s, transform 0.15s',
              transform: star <= (hovered || value) ? 'scale(1.15)' : 'scale(1)',
            }}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(name, star)}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
}