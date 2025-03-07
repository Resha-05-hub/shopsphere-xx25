import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import CartProvider from "./context/CartContext";
import WishlistProvider from "./context/WishlistContext";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import ProductDetails from "./components/ProductDetails";
import Payment from "./components/Payment";
import WatchCart from "./components/WatchCart";
import MobileCart from "./components/MobileCart";
import ShoeCart from "./components/ShoeCart";
import DressCart from "./components/DressCart";
import LoginModal from "./components/LoginModal";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";
import Contact from "./components/Contact";
import ReviewBox from "./components/ReviewBox";
import "./App.css";
import logo from "./components/logoS.png";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashEnd = () => setShowSplash(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
  };
  const handleLogout = () => setIsLoggedIn(false);

  const requireAuth = (Component) => (isLoggedIn ? <Component /> : <Navigate to="/" />);

  console.log("App Rendered");

  return (
    <CartProvider isLoggedIn={isLoggedIn} onRequireLogin={() => setIsLoginModalOpen(true)}>
      <WishlistProvider isLoggedIn={isLoggedIn} onRequireLogin={() => setIsLoginModalOpen(true)}>
        <Router>
          {showSplash ? (
            <SplashScreen onSplashEnd={handleSplashEnd} />
          ) : (
            <>
              {/* 🔹 Navigation Bar */}
              <nav className="navbar">
                <div className="logo">
                  <Link to="/">
                    <img src={logo} alt="ShopSphere Logo" className="logo-img" />
                    <span className="logo-text">ShopSphere</span>
                  </Link>
                </div>
                <div className="nav-links">
                  <Link to="/contact">Talk To Us 📞</Link>
                  <Link to="/wishlist">Wishlist 🛍️</Link>
                  <Link to="/cart">Cart 🛒</Link>
                  <Link to="/reviewBox">Reviews ⭐</Link> {/* ✅ NEW: Review Page Link */}
                  {isLoggedIn ? (
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                  ) : (
                    <button className="login-btn" onClick={() => setIsLoginModalOpen(true)}>Login</button>
                  )}
                </div>
              </nav>

              {/* 🔹 Sales Banner */}
              <div className="sales-banner">
                <div className="sales-text">Big Deal! Up to 50% OFF on Selected Categories!</div>
              </div>

              {/* 🔹 Category Bar */}
              <div className="category-bar">
                <Link to="/watch-cart" className="category-button">Watches ⌚</Link>
                <Link to="/mobile-cart" className="category-button">Mobiles 📱</Link>
                <Link to="/shoe-cart" className="category-button">Shoes 👟</Link>
                <Link to="/dress-cart" className="category-button">Dresses 👗</Link>
              </div>

              {/* 🔹 Routes */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={requireAuth(Cart)} />
                <Route path="/wishlist" element={requireAuth(Wishlist)} />
                <Route path="/payment" element={requireAuth(Payment)} />
                <Route path="/watch-cart" element={<WatchCart />} />
                <Route path="/mobile-cart" element={<MobileCart />} />
                <Route path="/shoe-cart" element={<ShoeCart />} />
                <Route path="/dress-cart" element={<DressCart />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/reviewBox" element={<ReviewBox />} /> {/* Updated route */}
              </Routes>

              {/* 🔹 Login Modal */}
              <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={handleLogin} />

              {/* 🔹 Footer */}
              <Footer />
            </>
          )}
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;
