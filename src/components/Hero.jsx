import { Link } from "react-router-dom";

import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.webp";
import hero3 from "../assets/hero3.webp";
import hero4 from "../assets/hero4.webp";
const carouselImages = [hero1, hero2, hero3, hero4];
function Hero() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
      <div>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          We’re changing the way people shop.
        </h1>
        <p className="max-w-xl mt-8 leading-8 text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
          inventore eum expedita repudiandae. Magnam ipsam quis numquam earum
          non adipisci voluptate, dolor delectus doloremque quo architecto
          tenetur fugit saepe libero.
        </p>
        <div className="mt-4">
          <Link to="/products" className="btn btn-primary">
            Our Products
          </Link>
        </div>
      </div>
      <div className="hidden lg:carousel h-[28rem] carousel-center space-x-8 bg-neutral p-4 rounded-box">
        {carouselImages.map((image) => {
          return (
            <div key={image} className="carousel-item">
              <img
                src={image}
                alt={image}
                className="h-full w-80 object-cover rounded-box"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Hero;
