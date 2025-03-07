import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Button from "./Button";
import "./ShoeCart.css";

const shoes = [
  { id: 1, name: "Nike Air Max", price: 12999, img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTalc3C4X9W62NCeV-eZNHqi3X302xOs4nob-eQjNSYlb6Li-aZZdgOyz7o798ECY3YzFltrOkGOPxJyMP6bc_PwHTvEaCZNj4B5Li1CHI0a2kOmnuUg_1zspuMScJl7vwDWkzu181KjyU&usqp=CAc" },
  { id: 2, name: "Adidas Ultraboost", price: 19999, img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRaBfpOJ94s9BUvYjjqJ_nONOrWeO0SjatTRE84g-MIo6R6qVKU9P_aMgo1uQ6YvfMrxqIk7q2w8xRAHCY6JFU1hjZr1vXvQPVXiFBoR0e7DPQgqcy48GEd&usqp=CAc" },
  { id: 3, name: "Nike Jordan", price: 69999, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgOnP78Cs4lkOYRs14-1H7PlejCTOPrjld2A&s" },
  { id: 4, name: "Bata", price: 99999, img: "https://tse3.mm.bing.net/th?id=OIP.4WdRI-JSlkontD6XQOsLsgHaES&pid=Api&P=0&h=220" },
];

const ShoeCart = () => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const [quantities, setQuantities] = useState({});
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem("shoeReviews");
    return savedReviews ? JSON.parse(savedReviews) : {};
  });
  const [newReviews, setNewReviews] = useState({});
  const [ratings, setRatings] = useState({});
  const [reviewTypes, setReviewTypes] = useState({});

  useEffect(() => {
    localStorage.setItem("shoeReviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleReviewSubmit = (shoeId) => {
    if (!newReviews[shoeId]?.trim() || !ratings[shoeId]) return;

    const reviewData = {
      id: Date.now(),
      text: newReviews[shoeId],
      rating: ratings[shoeId],
      type: reviewTypes[shoeId] || "good",
      verified: Math.random() > 0.5,
      date: new Date().toLocaleDateString(),
    };

    setReviews((prev) => ({
      ...prev,
      [shoeId]: [...(Array.isArray(prev[shoeId]) ? prev[shoeId] : []), reviewData],
    }));

    setNewReviews((prev) => ({ ...prev, [shoeId]: "" }));
    setRatings((prev) => ({ ...prev, [shoeId]: 0 }));
    setReviewTypes((prev) => ({ ...prev, [shoeId]: "good" }));
  };

  const handleDeleteReview = (shoeId, reviewId) => {
    setReviews((prev) => ({
      ...prev,
      [shoeId]: prev[shoeId]?.filter((review) => review.id !== reviewId) || [],
    }));
  };

  return (
    <div className="shoe-container">
      {shoes.map((shoe) => (
        <div key={shoe.id} className="shoe-card">
          <img src={shoe.img} alt={shoe.name} className="shoe-image"/>
          <div className="shoe-details">
            <h3 className="shoe-name">{shoe.name}</h3>
            <p className="shoe-price">
              Rs. {shoe.price} x {quantities[shoe.id] || 1} = Rs. {shoe.price * (quantities[shoe.id] || 1)}
            </p>
            <label>Qty:</label>
            <input 
              type="number" 
              value={quantities[shoe.id] || 1} 
              onChange={(e) =>
                setQuantities((prev) => ({
                  ...prev,
                  [shoe.id]: Math.max(1, parseInt(e.target.value) || 1),
                }))
              } 
              className="shoe-quantity"
            />
            <div className="button-group">
              <Button onClick={() => addToCart(shoe, quantities[shoe.id] || 1)}>Add to Cart 🛒</Button>
              <Button onClick={() => addToWishlist(shoe)} className="wishlist-button">Add to Wishlist ❤️</Button>
            </div>
            
            {/* Review Section */}
            <div className="review-section">
              <h4>Customer Reviews</h4>
              <div className="star-rating">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={`star ${index < (ratings[shoe.id] || 0) ? "selected" : ""}`}
                    onClick={() =>
                      setRatings((prev) => ({ ...prev, [shoe.id]: index + 1 }))
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
                    checked={reviewTypes[shoe.id] === "good"}
                    onChange={() => setReviewTypes((prev) => ({ ...prev, [shoe.id]: "good" }))}
                  />
                  Good
                </label>
                <label>
                  <input
                    type="radio"
                    value="bad"
                    checked={reviewTypes[shoe.id] === "bad"}
                    onChange={() => setReviewTypes((prev) => ({ ...prev, [shoe.id]: "bad" }))}
                  />
                  Bad
                </label>
              </div>
              <textarea
                placeholder="Write your review..."
                value={newReviews[shoe.id] || ""}
                onChange={(e) =>
                  setNewReviews((prev) => ({ ...prev, [shoe.id]: e.target.value }))
                }
              ></textarea>
              <Button onClick={() => handleReviewSubmit(shoe.id)}>Submit Review</Button>

              {/* Display Reviews */}
              <div className="reviews">
                {reviews[shoe.id]?.length ? (
                  reviews[shoe.id].map((rev) => (
                    <div key={rev.id} className="review-item">
                      <p>{rev.text}</p>
                      <div className="stars">{"★".repeat(rev.rating)}</div>
                      <div className={`review-type ${rev.type}`}>
                        {rev.type === "good" ? "👍 Good Review" : "👎 Bad Review"}
                      </div>
                      <span className="verified">{rev.verified ? "✔ Verified Purchase" : ""}</span>
                      <span className="date">🗓 {rev.date}</span>
                      <button onClick={() => handleDeleteReview(shoe.id, rev.id)}>Delete</button>
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

export default ShoeCart;
