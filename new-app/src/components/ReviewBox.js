import React, { useState, useEffect } from "react";
import "./ReviewBox.css";

const ReviewBox = () => {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem("appReviews");
    return Array.isArray(JSON.parse(savedReviews)) ? JSON.parse(savedReviews) : [];
  });
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewType, setReviewType] = useState("positive");

  useEffect(() => {
    localStorage.setItem("appReviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmit = () => {
    if (newReview.trim() === "" || rating === 0) return;

    const reviewData = {
      id: Date.now(),
      text: newReview,
      rating,
      type: reviewType,
      verified: Math.random() > 0.5,
      date: new Date().toLocaleDateString(),
    };

    setReviews((prev) => [...prev, reviewData]);
    setNewReview("");
    setRating(0);
    setReviewType("positive");
  };

  const handleDelete = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  return (
    <div className="review-box">
      <h2>Feedback on ShopSphere</h2>

      <div className="star-rating">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`star ${index < rating ? "selected" : ""}`}
            onClick={() => setRating(index + 1)}
          >
            ★
          </span>
        ))}
      </div>

      <div className="review-type">
        <label>
          <input type="radio" value="positive" checked={reviewType === "positive"} onChange={() => setReviewType("positive")} />
          Positive
        </label>
        <label>
          <input type="radio" value="negative" checked={reviewType === "negative"} onChange={() => setReviewType("negative")} />
          Negative
        </label>
      </div>

      <textarea placeholder="Share your experience with ShopSphere..." value={newReview} onChange={(e) => setNewReview(e.target.value)} />
      <button onClick={handleSubmit}>Submit Feedback</button>

      <div className="reviews">
        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map((rev) => (
            <div key={rev.id} className="review-item">
              <p>{rev.text}</p>
              <div className="stars">{"★".repeat(rev.rating)}</div>
              <div className={`review-type ${rev.type}`}>
                {rev.type === "positive" ? "👍 Positive Feedback" : "👎 Negative Feedback"}
              </div>
              <span className="verified">{rev.verified ? "✔ Verified User" : ""}</span>
              <span className="date">🗓 {rev.date}</span>
              <button onClick={() => handleDelete(rev.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No feedback yet.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewBox;
