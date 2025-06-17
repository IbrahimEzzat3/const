import React, { useState } from "react";
import StarRating from "./StarRating";
import { Button } from "./";
import { useLanguage } from "../../shared/context/LanguageContext";

const FeedbackForm = ({ onSubmit, isLoading }) => {
  const { t, direction } = useLanguage();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert(t("courseDetail.feedbackError"));
      return;
    }
    onSubmit({ rating, comment });
    setRating(0);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${direction}`}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("courseDetail.writeAReview")}
        </label>
        <StarRating rating={rating} setRating={setRating} />
      </div>

      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {t("message")}
        </label>
        <textarea
          id="comment"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          placeholder={t("courseDetail.writeAReview")}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          dir={direction}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
        disabled={rating === 0 || !comment.trim()}
      >
        {t("submit")}
      </Button>
    </form>
  );
};

export default FeedbackForm;
