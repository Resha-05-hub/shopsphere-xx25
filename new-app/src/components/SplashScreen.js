import React, { useEffect } from 'react';
import './SplashScreen.css'; // Import CSS for styling
import logoS from './logoS.png'; // Correct import for the image

const SplashScreen = ({ onSplashEnd }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onSplashEnd();
    }, 3000); // Adjust time as needed

    return () => clearTimeout(timer);
  }, [onSplashEnd]);

  return (
    <div className="splash-screen">
      <img src={logoS} alt="ShopSphere Logo" className="splash-logo" />
      <h1 className="splash-title">SHOPSPHERE</h1>
      <p className="splash-subtitle">Your world of endless shopping</p>
    </div>
  );
};

export default SplashScreen;
