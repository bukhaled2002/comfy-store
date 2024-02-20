import { PaginationContainer, Filters, ProductsContainer } from "../components";
import { customFetch } from "../utils";
const url = "/products";

const productsQuery = (queryParams) => {
  const { search, category, company, sort, shipping, price, page } =
    queryParams;
  return {
    queryKey: [
      "products",
      search ?? "",
      category ?? "all",
      company ?? "all",
      sort ?? "a-z",
      shipping ?? false,
      price ?? 100000,
      page ?? 1,
    ],
    queryFn: () => customFetch(url, { params: queryParams }),
  };
};
export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const response = await queryClient.ensureQueryData(productsQuery(params));
    const products = response.data.data;
    const meta = response.data.meta;
    return { products, meta, params };
  };
function Products() {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
}

export default Products;
