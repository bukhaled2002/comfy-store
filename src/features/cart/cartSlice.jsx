import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};
const getCartFromLocalState = () => {
  const val = JSON.parse(localStorage.getItem("cart")) || defaultState;
  return val;
};
const cartSlice = createSlice({
  initialState: getCartFromLocalState(),
  name: "cart",
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const item = state.cartItems.find((it) => it.cartID === product.cartID);
      console.log(product);
      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }
      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;
      cartSlice.caseReducers.calculateTotals(state);
      localStorage.setItem("cart", JSON.stringify(state));
      toast.success("item added to cart");
    },
    clearCart: () => {
      localStorage.setItem("cart", JSON.stringify(defaultState));
      return defaultState;
    },
    removeItem: (state, action) => {
      const product = state.cartItems.find(
        (i) => i.cartID === action.payload.cartID
      );
      state.cartItems = state.cartItems.filter(
        (i) => i.cartID !== action.payload.cartID
      );
      state.numItemsInCart -= product.amount;
      state.cartTotal -= product.amount * product.price;
      cartSlice.caseReducers.calculateTotals(state);
      toast.error("Items removed from cart");
    },
    editItem: (state, action) => {
      const item = state.cartItems.find(
        (i) => i.cartID === action.payload.cartID
      );
      state.numItemsInCart += action.payload.amount - item.amount;
      state.cartTotal += item.price * (action.payload.amount - item.amount);
      item.amount = action.payload.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("cart updated");
    },
    calculateTotals: (state) => {
      state.tax = state.cartTotal * 0.1;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});
export const { addItem, clearCart, editItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
