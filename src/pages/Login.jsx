import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import { customFetch } from "../utils";
import { loginUser } from "../features/cart/userSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export const action = ({ dispatch }) => {
  return async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const response = await customFetch.post("/auth/local", data);
      console.log(data, response.data);
      dispatch(loginUser(response.data));
      toast.success("logged in successfully");
      return redirect("/");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "please double check your credentials";
      toast.error(errorMessage);
      return null;
    }
  };
};
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginAsGuest = async () => {
    try {
      const response = await customFetch.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      });
      dispatch(loginUser(response.data));
      toast.success("welcome guest user");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("guest user login error please try again");
    }
  };
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card shadow-lg bg-base-100 w-96 flex flex-col p-8 gap-y-4"
      >
        <FormInput
          defaultValue="test@test.com"
          label="email"
          name="identifier"
          type="email"
        />
        <FormInput
          defaultValue="secret"
          label="password"
          name="password"
          type="password"
        />
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={loginAsGuest}
        >
          Login as Guest
        </button>
        <p className="text-center">
          Not a member yet?
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            regist
          </Link>
        </p>
      </Form>
    </section>
  );
}

export default Login;
