import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
import { OrdersList, SectionTitle } from "../components";
import ComplexPaginationContainer from "../components/ComplexPaginationContainer";

const ordersQuery = (params, user) => {
  return {
    queryKey: [
      "orders",
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () =>
      customFetch.get("/orders", {
        params,
        headers: { Authorization: `Bearer ${user.token}` },
      }),
  };
};
export const loader = (store, queryClient) => {
  return async ({ request }) => {
    // user
    const user = store.getState().userState.user;
    // search parameters
    if (!user) {
      toast.warn("you must login first");
      return redirect("/login");
    }
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    try {
      const response = await queryClient.ensureQueryData(
        ordersQuery(params, user)
      );

      return { orders: response?.data?.data, meta: response?.data?.meta };
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "there was an error accessing your orders";

      toast.error(errorMessage);
      if (error?.response?.status === 401 || 403) {
        return redirect("/login");
      }
      return null;
    }
  };
};
function Orders() {
  const { meta, orders } = useLoaderData();
  if (meta.pagination.tota < 1) {
    return <SectionTitle text={"Please make an order first"} />;
  }
  return (
    <>
      <SectionTitle text="Orders" />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  );
}

export default Orders;
