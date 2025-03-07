import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./Home.css"; // Importing the CSS file

const products = [
  { 
    id: 1, 
    name: "Makeup Set Lakme Products", 
    price: 20, 
    image: "https://www.gifts-to-india.com/images/CSCSUUN679_big.webp", 
    description: "LAKME ALLDAY LASTING MAKEUP KIT" 
  },
  { 
    id: 2, 
    name: "Power Tool Combo Kits",
    price: 30,
    image: "https://mobileimages.lowes.com/product/converted/885911/885911080019.jpg?size=pdhi", 
    description: "PORTER-CABLE 4-Tool Power Tool Combo Kit with Soft Case (2-Batteries Included and Charger Included)" 
  },
];

const Home = () => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  return (
    <div className="home-container">
      <h1 className="sales-heading">💎 Premium Offers 💎</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} className="product-image"/>
            </Link>
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">${product.price}</p>
            <div className="button-group">
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
