import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils";

function ProductsGrid() {
  const { products } = useLoaderData();
  // console.log(products);
  return (
    <div className="pt-24 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const { title, price, image } = product.attributes;
        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
          >
            <figure className="pt-4 px-4 ">
              <img
                src={image}
                alt={title}
                className="rounded-xl object-cover h-64 md:h-48 w-full"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="capitalize tracking-wider card-title">{title}</h2>
              <span className="text-secondary"> {formatPrice(price)}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ProductsGrid;
