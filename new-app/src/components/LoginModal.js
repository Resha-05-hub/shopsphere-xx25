import React from "react";
import "./LoginModal.css"; 

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content login-modal"> {/* Added login-modal class */}
        <span className="modal-close" onClick={onClose}>&times;</span>
        <h2>Login to Continue</h2>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button onClick={onLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginModal;
