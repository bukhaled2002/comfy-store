import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils";

function ProductsList() {
  const { products } = useLoaderData();
  return (
    <div className="grid gap-y-8">
      {products.map((product) => {
        const { image, title, price, company } = product.attributes;
        const dollarAmount = formatPrice(price);
        return (
          <Link
            key={product.id}
            to={`/products${product.id}`}
            className="card p-8 w-full shadow-lg hover:shadow-2xl duration-300 bg-base-100 transition flex sm:flex-row flex-col justify-between group"
          >
            <img
              src={image}
              alt={title}
              className="h-60 sm:h-32 sm:w-32 object-cover rounded-xl group-hover:scale-105 transition duration-300"
            />
            <div className="sm:basis-[70%] sm:ml-16 ml-0 mt-4 sm:mt-0">
              <h3 className="capitalize text-xl font-semibold tracking-wider mt-2 sm:mt-0">
                {title}
              </h3>
              <h4>{company}</h4>
            </div>
            <p className="mt-6 sm:mt-0">{dollarAmount}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default ProductsList;
