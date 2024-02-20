import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";

function CartItemsList() {
  const { cartItems } = useSelector((state) => state.cartState);
  console.log(cartItems);
  return (
    <div>
      {cartItems.map((item) => {
        return <CartItem key={item.cartID} {...item} />;
      })}
    </div>
  );
}

export default CartItemsList;
