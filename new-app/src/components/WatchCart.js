import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Button from "./Button";
import "./WatchCart.css";

const watches = [
  { id: 1, name: "Rolex", price: 144999, img: "https://luxurywatchesusa.com/wp-content/uploads/2021/02/buy-watches-luxury-watches-usa.jpg" },
  { id: 2, name: "Titan", price: 5999, img: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw5487e70b/images/Titan/Catalog/2606WM08_1.jpg?sw=600&sh=600" },
  { id: 3, name: "Sonata", price: 899, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNdL26nyj8SsvFIjUgSmwAQ8eJIpgze41burRD7UlADzA5fuaJcgLMNDQQ35HiLm3h18c&usqp=CAU" },
  { id: 4, name: "Hamilton", price: 316061, img: "https://www.watchnation.com/wp-content/uploads/2020/12/image199499022-9.jpg" },
];

const WatchCart = () => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const [quantities, setQuantities] = useState({});
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem("reviews");
    return savedReviews ? JSON.parse(savedReviews) : {};
  });
  const [newReview, setNewReview] = useState({});
  const [ratings, setRatings] = useState({});
  const [reviewType, setReviewType] = useState({});

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleReviewSubmit = (watchId) => {
    if (!newReview[watchId]?.trim() || !ratings[watchId]) return;

    const reviewData = {
      id: Date.now(),
      text: newReview[watchId],
      rating: ratings[watchId],
      type: reviewType[watchId] || "good",
      verified: Math.random() > 0.5,
      date: new Date().toLocaleDateString(),
    };

    setReviews((prev) => ({
      ...prev,
      [watchId]: [...(Array.isArray(prev[watchId]) ? prev[watchId] : []), reviewData],
    }));

    setNewReview((prev) => ({ ...prev, [watchId]: "" }));
    setRatings((prev) => ({ ...prev, [watchId]: 0 }));
    setReviewType((prev) => ({ ...prev, [watchId]: "good" }));
  };

  const handleDeleteReview = (watchId, reviewId) => {
    setReviews((prev) => ({
      ...prev,
      [watchId]: prev[watchId]?.filter((review) => review.id !== reviewId) || [],
    }));
  };

  return (
    <div className="watch-container">
      {watches.map((watch) => (
        <div key={watch.id} className="watch-card">
          <img src={watch.img} alt={watch.name} className="watch-image" />
          <div className="watch-details">
            <h3 className="watch-name">{watch.name}</h3>
            <p className="watch-price">
              Rs. {watch.price} x {quantities[watch.id] || 1} = Rs. {watch.price * (quantities[watch.id] || 1)}
            </p>
            <label>Qty:</label>
            <input
              type="number"
              value={quantities[watch.id] || 1}
              onChange={(e) =>
                setQuantities((prev) => ({
                  ...prev,
                  [watch.id]: Math.max(1, parseInt(e.target.value) || 1),
                }))
              }
              className="watch-quantity"
            />
            <div className="button-group">
              <Button onClick={() => addToCart(watch, quantities[watch.id] || 1)}>Add to Cart 🛒</Button>
              <Button onClick={() => addToWishlist(watch)} className="wishlist-button">Add to Wishlist ❤️</Button>
            </div>

            {/* Review Section */}
            <div className="review-section">
              <h4>Customer Reviews</h4>
              <div className="star-rating">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={`star ${index < (ratings[watch.id] || 0) ? "selected" : ""}`}
                    onClick={() =>
                      setRatings((prev) => ({ ...prev, [watch.id]: index + 1 }))
                    }
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
                    checked={reviewType[watch.id] === "good"}
                    onChange={() => setReviewType((prev) => ({ ...prev, [watch.id]: "good" }))}
                  />
                  Good
                </label>
                <label>
                  <input
                    type="radio"
                    value="bad"
                    checked={reviewType[watch.id] === "bad"}
                    onChange={() => setReviewType((prev) => ({ ...prev, [watch.id]: "bad" }))}
                  />
                  Bad
                </label>
              </div>
              <textarea
                placeholder="Write your review..."
                value={newReview[watch.id] || ""}
                onChange={(e) =>
                  setNewReview((prev) => ({ ...prev, [watch.id]: e.target.value }))
                }
              ></textarea>
              <Button onClick={() => handleReviewSubmit(watch.id)}>Submit Review</Button>

              {/* Display Reviews */}
              <div className="reviews">
                {Array.isArray(reviews[watch.id]) && reviews[watch.id].length > 0 ? (
                  reviews[watch.id].map((rev) => (
                    <div key={rev.id} className="review-item">
                      <p>{rev.text}</p>
                      <div className="stars">{"★".repeat(rev.rating)}</div>
                      <div className={`review-type ${rev.type}`}>
                        {rev.type === "good" ? "👍 Good Review" : "👎 Bad Review"}
                      </div>
                      <span className="verified">{rev.verified ? "✔ Verified Purchase" : ""}</span>
                      <span className="date">🗓 {rev.date}</span>
                      <button onClick={() => handleDeleteReview(watch.id, rev.id)}>Delete</button>
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

export default WatchCart;
