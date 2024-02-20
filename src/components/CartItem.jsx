import React from "react";
import { formatPrice, generateAmountOptions } from "../utils";
import { editItem, removeItem } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
function CartItem({
  cartID,
  title,
  price,
  image,
  amount,
  company,
  productColor,
}) {
  const dispatch = useDispatch();
  const removeItemFromTheCart = () =>
    dispatch(removeItem({ cartID, amount: amount }));
  const handleAmount = (e) => {
    dispatch(editItem({ cartID, amount: parseInt(e.target.value) }));
  };
  console.log(productColor);
  return (
    <article className="grid gap-8 mt-8 grid-cols-4">
      <img
        src={image}
        className="w-32 h-32 object-cover rounded-xl"
        alt={title}
      />
      <div className="ml-5 basis-10">
        <h4 className="capitalize font-semibold">{title}</h4>
        <p>{company}</p>
        <p>
          color:
          <span
            className="w-3 h-3 rounded-full inline-block mt-4 ml-2 leading-8"
            style={{ backgroundColor: productColor }}
          ></span>
        </p>
      </div>
      <div className="form-control ml-8 max-w-xs items-center">
        <div className="label">
          <span className="label-text text-center">Amount</span>
        </div>
        <select
          className="mt-2 select select-base select-bordered select-xs"
          onChange={handleAmount}
          name="amount"
          id="amount"
          value={amount}
        >
          {generateAmountOptions(amount + 5)}
        </select>
        <button
          type="button"
          className="text-primary link-hover mt-2 text-sm"
          onClick={removeItemFromTheCart}
        >
          remove
        </button>
      </div>
      <div className="flex justify-end">
        <p className="mt-3 font-medium">{formatPrice(price)}</p>
      </div>
    </article>
  );
}

export default CartItem;
