import React from 'react';
import { Star, StarHalf } from 'phosphor-react';
import './StarRating.css';

function StarRating({ rating }) {
  const filledStars = Math.floor(rating);
  const remainder = rating - filledStars;
  const starElements = [];

  // Create filled stars
  for (let i = 0; i < filledStars; i++) {
    starElements.push(
      <Star key={i} weight="fill" color='orange' />
    );
  }

  // Add half star if necessary
  if (remainder >= 0.5) {
    starElements.push(
      <StarHalf key="half" weight="fill" color='orange' />
    );
  }

  // Add empty stars to fill up to 5 stars
  while (starElements.length < 5) {
    starElements.push(
      <Star key={starElements.length} weight="thin" color='orange' />
    );
  }

  return (
    <div className="star-rating-container">
      <div className="star-tooltip">{rating}</div>
      <div className="star-icons">{starElements}</div>
    </div>
  );
}

export default StarRating;
