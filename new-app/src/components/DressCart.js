import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Button from "./Button";
import "./DressCart.css";

const dresses = [
  { id: 1, name: "Floral Gown", price: 3999, img: "https://tse3.mm.bing.net/th?id=OIP.kUDDcdk2sSAu6Gdb8tO2_gHaKb&pid=Api&P=0&h=220" },
  { id: 2, name: "Party Dress", price: 4999, img: "https://tse3.mm.bing.net/th?id=OIP.T8hToLoWaZMTqTORx0FvSwHaLH&pid=Api&P=0&h=220" },
  { id: 3, name: "Baggy Hoodie", price: 599, img: "https://tse2.mm.bing.net/th?id=OIP.DkO_0P0VessxnxZwdGHaWgHaHa&pid=Api&P=0&h=220" },
  { id: 4, name: "Men Shirt", price: 1689, img: "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/25263206/2023/9/30/820576a5-d935-44cd-a726-6450b03d65f01696047835904RARERABBITMenBlueSlimFitGinghamChecksOpaqueCheckedCasualShir2.jpg" },  
];

const DressCart = () => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const [quantities, setQuantities] = useState({});
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem("dressReviews");
    return savedReviews ? JSON.parse(savedReviews) : {};
  });
  const [newReview, setNewReview] = useState({});
  const [ratings, setRatings] = useState({});
  const [reviewType, setReviewType] = useState({});

  useEffect(() => {
    localStorage.setItem("dressReviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleReviewSubmit = (dressId) => {
    if (!newReview[dressId]?.trim() || !ratings[dressId]) return;

    const reviewData = {
      id: Date.now(),
      text: newReview[dressId],
      rating: ratings[dressId],
      type: reviewType[dressId] || "good",
      verified: Math.random() > 0.5,
      date: new Date().toLocaleDateString(),
    };

    setReviews((prev) => ({
      ...prev,
      [dressId]: [...(Array.isArray(prev[dressId]) ? prev[dressId] : []), reviewData],
    }));

    setNewReview((prev) => ({ ...prev, [dressId]: "" }));
    setRatings((prev) => ({ ...prev, [dressId]: 0 }));
    setReviewType((prev) => ({ ...prev, [dressId]: "good" }));
  };

  const handleDeleteReview = (dressId, reviewId) => {
    setReviews((prev) => ({
      ...prev,
      [dressId]: prev[dressId]?.filter((review) => review.id !== reviewId) || [],
    }));
  };

  return (
    <div className="dress-container">
      {dresses.map((dress) => (
        <div key={dress.id} className="dress-card">
          <img src={dress.img} alt={dress.name} className="dress-image" />
          <div className="dress-details">
            <h3 className="dress-name">{dress.name}</h3>
            <p className="dress-price">
              Rs. {dress.price} x {quantities[dress.id] || 1} = Rs. {dress.price * (quantities[dress.id] || 1)}
            </p>
            <label>Qty:</label>
            <input
              type="number"
              value={quantities[dress.id] || 1}
              onChange={(e) =>
                setQuantities((prev) => ({
                  ...prev,
                  [dress.id]: Math.max(1, parseInt(e.target.value) || 1),
                }))
              }
              className="dress-quantity"
            />
            <div className="button-group">
              <Button onClick={() => addToCart(dress, quantities[dress.id] || 1)}>Add to Cart 🛒</Button>
              <Button onClick={() => addToWishlist(dress)} className="wishlist-button">Add to Wishlist ❤️</Button>
            </div>

            {/* Review Section */}
            <div className="review-section">
              <h4>Customer Reviews</h4>
              <div className="star-rating">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={`star ${index < (ratings[dress.id] || 0) ? "selected" : ""}`}
                    onClick={() =>
                      setRatings((prev) => ({ ...prev, [dress.id]: index + 1 }))
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
                    checked={reviewType[dress.id] === "good"}
                    onChange={() => setReviewType((prev) => ({ ...prev, [dress.id]: "good" }))}
                  />
                  Good
                </label>
                <label>
                  <input
                    type="radio"
                    value="bad"
                    checked={reviewType[dress.id] === "bad"}
                    onChange={() => setReviewType((prev) => ({ ...prev, [dress.id]: "bad" }))}
                  />
                  Bad
                </label>
              </div>
              <textarea
                placeholder="Write your review..."
                value={newReview[dress.id] || ""}
                onChange={(e) =>
                  setNewReview((prev) => ({ ...prev, [dress.id]: e.target.value }))
                }
              ></textarea>
              <Button onClick={() => handleReviewSubmit(dress.id)}>Submit Review</Button>

              {/* Display Reviews */}
              <div className="reviews">
                {reviews[dress.id]?.length ? (
                  reviews[dress.id].map((rev) => (
                    <div key={rev.id} className="review-item">
                      <p>{rev.text}</p>
                      <div className="stars">{"★".repeat(rev.rating)}</div>
                      <div className={`review-type ${rev.type}`}>
                        {rev.type === "good" ? "👍 Good Review" : "👎 Bad Review"}
                      </div>
                      <span className="verified">{rev.verified ? "✔ Verified Purchase" : ""}</span>
                      <span className="date">🗓 {rev.date}</span>
                      <button onClick={() => handleDeleteReview(dress.id, rev.id)}>Delete</button>
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

export default DressCart;
