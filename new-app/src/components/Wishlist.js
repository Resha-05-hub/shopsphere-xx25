import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import Button from "./Button";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  console.log("Wishlist items: ", wishlist); // Logging wishlist items

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        wishlist.map((item) => (
          <div key={item.id} className="p-4 border rounded-lg shadow flex justify-between">
            <p>{item.name} - ${item.price}</p>
            <Button onClick={() => addToCart(item, 1)}>Add to Cart</Button>
            <Button onClick={() => removeFromWishlist(item.id)}>Remove</Button>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;
