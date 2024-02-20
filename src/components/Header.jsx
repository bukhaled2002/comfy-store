import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/cart/userSlice";
import { clearCart } from "../features/cart/cartSlice";
import { useQueryClient } from "@tanstack/react-query";

function Header() {
  const { user } = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleLogout = () => {
    queryClient.removeQueries();
    dispatch(logoutUser());
    dispatch(clearCart());
    navigate("/");
  };
  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end">
        {user ? (
          <div className="flex gap-x-2 items-center">
            <p className="text-xs sm:text-start"> Hello, {user.username}</p>
            <button
              className="btn btn-xs btn-outline btn-primary"
              onClick={handleLogout}
            >
              log out
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link to="/login" className="link link-hover text-xs sm:text-sm">
              Sign in / Guest
            </Link>
            <Link to="/register" className="link link-hover text-xs sm:text-sm">
              Create Acount
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
