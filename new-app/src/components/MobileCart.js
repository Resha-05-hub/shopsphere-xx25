import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Button from "./Button";
import "./MobileCart.css";

const mobiles = [
  { id: 1, name: "iPhone 14", price: 79999, img: "https://hips.hearstapps.com/hmg-prod/images/iphone-14-main-1664526346.jpg?crop=1xw:0.8888888888888888xh;center,top&resize=1200:*" },
  { id: 2, name: "Samsung Galaxy S23", price: 69999, img: "https://resize.indiatvnews.com/en/resize/newbucket/738_-/2024/12/samsung-galaxy-s23-ultra-1-1735221127.webp" },
  { id: 3, name: "OnePlus 11", price: 59999, img: "https://i.gadgets360cdn.com/large/oneplus_11_weibo_1672037858624.jpg?downsize=950:*" },
  { id: 4, name: "Redmi 12C", price: 13999, img: "https://tse4.mm.bing.net/th?id=OIP.8Sci78U9CO6iNqPoxg-1eAHaE9&pid=Api&P=0&h=220" },
];

const MobileCart = () => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [quantity, setQuantity] = useState({}); // Store quantity per item
  const [reviews, setReviews] = useState(() => JSON.parse(localStorage.getItem("mobileReviews")) || {});
  const [newReview, setNewReview] = useState({});
  const [ratings, setRatings] = useState({});
  const [reviewType, setReviewType] = useState({});

  useEffect(() => {
    localStorage.setItem("mobileReviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleReviewSubmit = (mobileId) => {
    if (!newReview[mobileId]?.trim() || !ratings[mobileId]) return;

    const reviewData = {
      id: Date.now(),
      text: newReview[mobileId],
      rating: ratings[mobileId],
      type: reviewType[mobileId] || "good",
      verified: Math.random() > 0.5,
      date: new Date().toLocaleDateString(),
    };

    setReviews((prevReviews) => ({
      ...prevReviews,
      [mobileId]: [...(prevReviews[mobileId] || []), reviewData],
    }));

    setNewReview((prev) => ({ ...prev, [mobileId]: "" }));
    setRatings((prev) => ({ ...prev, [mobileId]: 0 }));
    setReviewType((prev) => ({ ...prev, [mobileId]: "good" }));
  };

  const handleDeleteReview = (mobileId, reviewId) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [mobileId]: prevReviews[mobileId].filter((review) => review.id !== reviewId),
    }));
  };

  return (
    <div className="mobile-container">
      {mobiles.map((mobile) => (
        <div key={mobile.id} className="mobile-card">
          <img src={mobile.img} alt={mobile.name} className="mobile-image" />
          <div className="mobile-details">
            <h3 className="mobile-name">{mobile.name}</h3>
            <p className="mobile-price">
              Rs. {mobile.price} x {quantity[mobile.id] || 1} = Rs. {mobile.price * (quantity[mobile.id] || 1)}
            </p>
            <label>Qty:</label>
            <input
              type="number"
              value={quantity[mobile.id] || 1}
              onChange={(e) => setQuantity((prev) => ({ ...prev, [mobile.id]: Math.max(1, parseInt(e.target.value) || 1) }))}
              className="mobile-quantity"
            />
            <div className="button-group">
              <Button onClick={() => addToCart(mobile, quantity[mobile.id] || 1)}>Add to Cart 🛒</Button>
              <Button onClick={() => addToWishlist(mobile)} className="wishlist-button">Add to Wishlist ❤️</Button>
            </div>

            {/* Review Section */}
            <div className="review-section">
              <h4>Customer Reviews</h4>
              <div className="star-rating">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={`star ${index < (ratings[mobile.id] || 0) ? "selected" : ""}`}
                    onClick={() => setRatings((prev) => ({ ...prev, [mobile.id]: index + 1 }))}
                  >
                    ★
                  </span>
                ))}
              </div>
              <div className="review-type">
                <label>
                  <input
                    type="radio"
                    value="good"
                    checked={reviewType[mobile.id] === "good"}
                    onChange={() => setReviewType((prev) => ({ ...prev, [mobile.id]: "good" }))}
                  />
                  Good
                </label>
                <label>
                  <input
                    type="radio"
                    value="bad"
                    checked={reviewType[mobile.id] === "bad"}
                    onChange={() => setReviewType((prev) => ({ ...prev, [mobile.id]: "bad" }))}
                  />
                  Bad
                </label>
              </div>
              <textarea
                placeholder="Write your review..."
                value={newReview[mobile.id] || ""}
                onChange={(e) => setNewReview((prev) => ({ ...prev, [mobile.id]: e.target.value }))}
              ></textarea>
              <Button onClick={() => handleReviewSubmit(mobile.id)}>Submit Review</Button>

              {/* Display Reviews */}
              <div className="reviews">
                {reviews[mobile.id]?.length ? (
                  reviews[mobile.id].map((rev) => (
                    <div key={rev.id} className="review-item">
                      <p>{rev.text}</p>
                      <div className="stars">{"★".repeat(rev.rating)}</div>
                      <div className={`review-type ${rev.type}`}>
                        {rev.type === "good" ? "👍 Good Review" : "👎 Bad Review"}
                      </div>
                      <span className="verified">{rev.verified ? "✔ Verified Purchase" : ""}</span>
                      <span className="date">🗓 {rev.date}</span>
                      <button onClick={() => handleDeleteReview(mobile.id, rev.id)}>Delete</button>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileCart;
