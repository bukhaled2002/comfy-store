import { useSelector } from "react-redux";
import { SectionTitle } from "../components";
import CartTotal from "../components/CartTotal";
import CartItemsList from "../components/CartItemsList";
import { Link } from "react-router-dom";

function Cart() {
  const { numItemsInCart } = useSelector((state) => state.cartState);

  const user = useSelector((state) => state.userState.user);
  if (numItemsInCart < 1) {
    return <SectionTitle text="your cart is empty" />;
  }
  return (
    <>
      <SectionTitle />
      <div className="mt-4 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList />
        </div>
        <div className="lg:col-span-4 lg:pl-4 mt-4">
          <CartTotal />
          {user ? (
            <Link to="/checkout" className="btn btn-primary btn-block mt-8">
              procceed to checkout
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary btn-block mt-8">
              please log in
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
