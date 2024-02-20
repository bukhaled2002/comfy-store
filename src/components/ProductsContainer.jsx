import { useState } from "react";
import ProductsList from "./ProductsList";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useLoaderData } from "react-router-dom";
import ProductsGrid from "./ProductsGrid";
function ProductsContainer() {
  const { meta } = useLoaderData();

  const [layout, setLayout] = useState("grid");
  console.log(meta);
  const { total } = meta.pagination;
  const setActiveStyles = (pattern) => {
    return `text-xl btn btn-circle btn-sm ${
      pattern === layout
        ? "btn-primary text-primary-content"
        : "btn-ghost text-base-content"
    }`;
  };
  return (
    <>
      <div className="my-6 pb-2 border-b-2 border-base-200  flex justify-between">
        <h2 className="font-bold ">
          {total} {total === 1 ? "product" : "products"}
        </h2>
        <div className="flex justify-end ">
          <button
            className={setActiveStyles("grid")}
            onClick={() => setLayout("grid")}
          >
            <BsFillGridFill />
          </button>
          <button
            className={setActiveStyles("list")}
            onClick={() => setLayout("list")}
          >
            <BsList />
          </button>
        </div>
      </div>
      {total === 0 ? (
        <h5 className="text-2xl mt-16">
          Sorry, no products mathced your search
        </h5>
      ) : layout === "grid" ? (
        <ProductsGrid />
      ) : (
        <ProductsList />
      )}
    </>
  );
}

export default ProductsContainer;
