import React from "react";

const Button = ({ children, onClick }) => (
  <button className="p-2 bg-blue-500 text-white rounded" onClick={onClick}>
    {children}
  </button>
);

export default Button; // ✅ Must be default export
