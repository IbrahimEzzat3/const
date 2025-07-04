import React, { useState } from "react";

const StarRating = ({ rating, setRating, readonly = false }) => {
  const [hover, setHover] = useState(0);

  const StarIcon = ({ filled, index }) => (
    <svg
      className={`w-6 h-6 cursor-pointer ${readonly ? "cursor-default" : ""} ${
        filled ? "text-yellow-400" : "text-gray-300"
      }`}
      fill="currentColor"
      viewBox="0 0 20 20"
      onMouseEnter={() => !readonly && setHover(index)}
      onMouseLeave={() => !readonly && setHover(0)}
      onClick={() => !readonly && setRating(index)}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((index) => (
        <StarIcon
          key={index}
          index={index}
          filled={index <= (hover || rating)}
        />
      ))}
      {!readonly && (
        <span className="ml-2 text-sm text-gray-600">
          {rating ? `${rating} stars` : "Rate this"}
        </span>
      )}
    </div>
  );
};

export default StarRating;
