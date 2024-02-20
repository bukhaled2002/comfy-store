import { FeaturedProducts, Hero } from "../components";
import { customFetch } from "../utils";
const featuredPoductsQuery = {
  queryKey: ["featuredProducts"],
  queryFn: () => customFetch("/products?featured=true"),
};
export const loader = (queryClient) => async () => {
  const response = await queryClient.ensureQueryData(featuredPoductsQuery);
  const products = response.data.data;
  return { products };
};
function Landing() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
}

export default Landing;
