import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Button from "./Button";
import "./ProductDetails.css";

const products = [
  {
    id: 1,
    name: "Makeup Set Lakme Products",
    price: 20,
    image: "https://www.gifts-to-india.com/images/CSCSUUN679_big.webp",
    description: "LAKME ALLDAY LASTING MAKEUP KIT",
  },
  {
    id: 2,
    name: "Power Tool Combo Kits",
    price: 30,
    image: "https://mobileimages.lowes.com/product/converted/885911/885911080019.jpg?size=pdhi",
    description: "PORTER-CABLE 4-Tool Power Tool Combo Kit with Soft Case (2-Batteries Included and Charger Included)",
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <h2 className="not-found">Product not found</h2>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    console.log("Added to cart:", { product, quantity });
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    console.log("Added to wishlist:", product);
  };

  return (
    <div className="product-container">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-details">
        <h1>{product.name}</h1>
        <p className="product-description">{product.description}</p>
        <p className="product-price">Rs. {product.price} x {quantity} = Rs. {product.price * quantity}</p>

        <div className="quantity-container">
          <label>Qty:</label>
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          />
        </div>

        <div className="button-group">
          <Button onClick={handleAddToCart}>🛒 Add to Cart</Button>
          <Button onClick={handleAddToWishlist} className="wishlist-button">❤️ Add to Wishlist</Button>
        </div>

        <ReviewSection productId={product.id} />
      </div>
    </div>
  );
};

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim() || rating === 0) return;
    const newReview = {
      comment,
      rating,
      date: new Date().toLocaleDateString(),
      verified: Math.random() > 0.5,
      helpful: 0,
    };
    setReviews([newReview, ...reviews]);
    setComment("");
    setRating(0);
  };

  const handleHelpful = (index) => {
    setReviews((prevReviews) =>
      prevReviews.map((review, i) =>
        i === index ? { ...review, helpful: review.helpful + 1 } : review
      )
    );
  };

  const handleDelete = (index) => {
    setReviews(reviews.filter((_, i) => i !== index));
  };

  const paginatedReviews = reviews.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage);

  return (
    <div className="review-section">
      <h3>Customer Reviews ⭐ ({reviews.length > 0 ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1) : "No Ratings Yet"})</h3>
      <form onSubmit={handleReviewSubmit} className="review-form">
        <div className="star-rating">
          {[...Array(5)].map((_, index) => (
            <span key={index} className={rating > index ? "star selected" : "star"} onClick={() => setRating(index + 1)}>★</span>
          ))}
        </div>
        <textarea placeholder="Write your review..." value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
        <button type="submit">Submit Review</button>
      </form>

      <div className="review-list">
        {paginatedReviews.length > 0 ? (
          paginatedReviews.map((review, index) => (
            <div key={index} className="review-item">
              <p className="review-comment">"{review.comment}"</p>
              <p className="review-rating">⭐ {review.rating} / 5 {review.verified && "✅ Verified Purchase"}</p>
              <p className="review-date">📅 {review.date}</p>
              <button onClick={() => handleHelpful((currentPage - 1) * reviewsPerPage + index)}>👍 Helpful ({review.helpful})</button>
              <button onClick={() => handleDelete((currentPage - 1) * reviewsPerPage + index)}>🗑 Delete</button>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review! 📝</p>
        )}
      </div>

      <div className="pagination-controls">
        {Array.from({ length: Math.ceil(reviews.length / reviewsPerPage) }, (_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
