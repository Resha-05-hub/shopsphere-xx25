import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div style={{ textAlign: "center", padding: "50px", maxWidth: "600px", margin: "auto" }}>
      <h1>Get In Touch</h1>
      <p style={{ fontSize: "1.2rem", color: "#555" }}>
        Feel free to reach out at <strong>shopsphereofficial@gmail.com</strong>
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px", alignItems: "center", width: "100%" }}>
        <input 
          type="text" 
          name="name" 
          placeholder="Your Name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
          style={{ padding: "10px", fontSize: "1rem", width: "100%", maxWidth: "500px" }}
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Your Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
          style={{ padding: "10px", fontSize: "1rem", width: "100%", maxWidth: "500px" }}
        />
        <textarea 
          name="message" 
          placeholder="Your Message" 
          value={formData.message} 
          onChange={handleChange} 
          required 
          style={{ padding: "10px", fontSize: "1rem", height: "100px", width: "100%", maxWidth: "500px" }}
        ></textarea>
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <button type="submit" style={{ padding: "10px", fontSize: "1rem", backgroundColor: "#d63384", width: "50%", maxWidth: "200px", color: "white", border: "none", cursor: "pointer", textAlign: "center" }}>Send Message</button>
        </div>
      </form>

      <div style={{ marginTop: "20px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h3>Follow Us</h3>
        <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          <a href="https://www.facebook.com/" target="_blank">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" width="30" />
          </a>
          <a href="https://twitter.com/" target="_blank" style={{ filter: "invert(1)" }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg" alt="Twitter" width="30" />
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" width="30" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
