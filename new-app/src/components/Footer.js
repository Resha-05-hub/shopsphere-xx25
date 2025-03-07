import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>ShopSphere</h3>
          <p>Your ultimate shopping destination for the latest trends.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-of-service">Terms of Service</a></li>
            <li><a href="/contact-us">Contact Us</a></li>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="/customer-support">Customer Support</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Stay Connected</h3>
          <p>Join our community and stay updated!</p>
          <div className="social-icons">
            <a href="https://www.facebook.com/" target="_blank">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
            </a>
            <a href="https://twitter.com/" target="_blank">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg" alt="Twitter" />
            </a>
            <a href="https://www.instagram.com/" target="_blank">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" />
            </a>
            <a href="https://www.linkedin.com/" target="_blank">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" />
            </a>
            <a href="https://www.youtube.com/" target="_blank">
              <img src="https://img.icons8.com/?size=160&id=omVNNE6wkyP7&format=png" alt="YouTube" />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Newsletter</h3>
          <p>Subscribe for exclusive deals and updates.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        <div className="footer-section payment-methods">
          <h3>We Accept</h3>
          <div className="payment-icons">
            <img src="https://img.icons8.com/?size=96&id=13608&format=png" alt="Visa" />
            <img src="https://img.icons8.com/?size=96&id=62765&format=png" alt="MasterCard" />
            <img src="https://img.icons8.com/?size=96&id=13611&format=png" alt="PayPal" />
            <img src="https://img.icons8.com/?size=96&id=17949&format=png" alt="Google Pay" />
          </div>
        </div>

        <div className="footer-section live-chat">
          <h3>Live Chat Support</h3>
          <p>Need help? Chat with our support team 24/7.</p>
          <button className="chat-button">Chat Now</button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ShopSphere. All rights reserved.</p>
        <p className="footer-slogan">"Shop Smart, ShopSphere!"</p>
        <div className="trust-badge">
          <img src="https://img.icons8.com/?size=96&id=44027&format=png" alt="Secure Shopping" />
          <p>100% Secure Shopping</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
