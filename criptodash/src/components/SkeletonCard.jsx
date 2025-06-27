// src/components/SkeletonCard.jsx
import React from 'react';
import './SkeletonCard.css'; // Vamos criar este CSS

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text short"></div>
    </div>
  );
};

export default SkeletonCard;