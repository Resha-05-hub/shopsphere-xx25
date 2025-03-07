import React from "react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { getCartCount } = useCart();

  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">My Store</h1>
      <div className="relative">
        🛒 <span className="bg-red-500 text-white px-2 py-1 rounded-full">{getCartCount()}</span>
      </div>
    </nav>
  );
};

export default Navbar;
