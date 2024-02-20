import React, { useState } from "react";
import { customFetch, formatPrice, generateAmountOptions } from "../utils";
import { Link, useLoaderData } from "react-router-dom";
import { addItem } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
const singleProductQuery = (params) => {
  return {
    queryKey: [`singleProductQuery`, params.id],
    queryFn: () => customFetch(`/products/${params.id}`),
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const response = await queryClient.ensureQueryData(
      singleProductQuery(params)
    );
    const singleProduct = response.data.data;
    return { singleProduct };
  };
function SingleProduct() {
  const { singleProduct } = useLoaderData();
  const { colors, price, company, description, image, title } =
    singleProduct.attributes;
  const [amount, setAmount] = useState(1);
  const [productColor, setProductColor] = useState(colors[0]);
  const dollarAmount = formatPrice(price);
  const handleAmount = (e) => {
    console.log(+e.target.value);
    setAmount(parseInt(e.target.value));
  };
  const dispatch = useDispatch();
  const cartProduct = {
    cartID: singleProduct.id + productColor,
    productID: singleProduct.id,
    image,
    title,
    price,
    amount,
    productColor,
    company,
  };

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };
  return (
    <section>
      <div className="breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full lg:gap-20 mt-4">
        <div>
          <img
            src={image}
            alt={title}
            className="w-96 h-96 lg:h-96 lg:w-full object-cover rounded-xl"
          />
        </div>
        <div>
          <h1 className="capitalize font-bold text-3xl">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3">{dollarAmount}</p>
          <p className="mt-6 leading-8">{description}</p>
          {/* Colors */}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              colors
            </h4>
            <div className="mt-2">
              {colors.map((color) => {
                return (
                  <button
                    type="button"
                    key={color}
                    className={`badge w-6 h-6 mr-2 ${
                      color === productColor && "border-2 border-secondary"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setProductColor(color)}
                  ></button>
                );
              })}
            </div>
          </div>
          {/* amount */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <h4 className="text-md font-medium tracking-wider capitalize">
                amount
              </h4>
            </label>
            <select
              className="select select-secondary select-bordered select-md"
              value={amount}
              onChange={handleAmount}
            >
              {generateAmountOptions(10)}
            </select>
          </div>

          <div className="mt-10">
            <button className="btn btn-secondary btn-md" onClick={addToCart}>
              add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleProduct;
