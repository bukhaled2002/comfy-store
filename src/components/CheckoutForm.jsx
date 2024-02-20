import { Form, redirect } from "react-router-dom";
import { customFetch, formatPrice } from "../utils";
import SubmitBtn from "./SubmitBtn";
import FormInput from "./FormInput";
import { clearCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

export const action = (store, queryClient) => {
  return async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const user = store.getState().userState.user;
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;
    const info = {
      ...data,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems,
      numItemsInCart,
    };
    try {
      const response = await customFetch.post(
        "/orders",
        { data: info },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      queryClient.removeQueries(["orders"]);
      store.dispatch(clearCart());

      toast.success("Order placed successfully");
      return redirect("/orders");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "there was an error placing your order";
      toast.error(errorMessage);
      if (error?.response?.status === 401 || 403) {
        return redirect("/login");
      }
      return null;
    }
  };
};
function CheckoutForm() {
  return (
    <Form method="post" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl">Shipping Information</h4>
      <FormInput label="name" name="name" type={"text"} />
      <FormInput label="address" name="address" type={"text"} />
      <div className="mt-4">
        <SubmitBtn text={"place your order"} />
      </div>
    </Form>
  );
}

export default CheckoutForm;
