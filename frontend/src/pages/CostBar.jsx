import React from 'react';

const MAX_VALUE = 45000;
const MIN_WIDTH_PX = 80;

function parseFirstNumber(str) {
  if (!str) return 0;
  const cleaned = str.replace(/[^0-9-]/g, '');
  const first   = cleaned.split('-')[0];
  return parseInt(first, 10) || 0;
}

export default function CostBar({ label, value }) {
  const numeric    = parseFirstNumber(String(value));
  let   percentage = Math.min((numeric / MAX_VALUE) * 100, 95);

  // Format display value as currency range string
  const formatCurrency = (n) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD',
      minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(n);

  const displayValue = (() => {
    if (!value) return 'N/A';
    const s = String(value);
    if (!s.includes('-')) return formatCurrency(parseInt(s.replace(/\D/g, ''), 10));
    const [min, max] = s.split('-').map((v) => parseInt(v.trim(), 10));
    return `${formatCurrency(min)} – ${formatCurrency(max)}`;
  })();

  return (
    <li className="cost-bar-container">
      <strong className="cost-bar-label">{label}</strong>
      <div className="cost-bar-wrapper">
        <div
          className="cost-bar"
          style={{ width: `${percentage}%`, minWidth: percentage < 5 ? `${MIN_WIDTH_PX}px` : undefined }}
        >
          <span className="cost-value">{displayValue}</span>
        </div>
      </div>
    </li>
  );
}