import React from "react";
import { useCart } from "../context/CartContext";
import Button from "./Button";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  console.log("Cart items: ", cart); // Logging cart items

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow flex items-center justify-between"
          >
            <img
              src={item.img || "https://via.placeholder.com/100"}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <p>
              {item.name} - ${item.price} x {item.quantity}
            </p>
            <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
