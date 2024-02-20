import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

function PaginationContainer() {
  const { meta } = useLoaderData();
  const location = useLocation();
  const { page, pageCount } = meta.pagination;
  const navigate = useNavigate();
  console.log(page, pageCount);
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  console.log(location);
  const handlaPageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", pageNumber);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };
  console.log(page === 1);
  return (
    <div className="join mt-16 flex justify-end">
      <button
        className={`join-item btn btn-md ${page === 1 && "cursor-not-allowed"}`}
        disabled={page === 1}
        onClick={() => handlaPageChange(page - 1)}
      >
        back
      </button>
      {pages.map((p) => {
        return (
          <button
            key={p}
            onClick={() => handlaPageChange(p)}
            className={`join-item btn btn-md ${p === page && "btn-active"}`}
          >
            {p}
          </button>
        );
      })}
      <button
        className={`join-item btn btn-md ${
          page === pageCount && "cursor-not-allowed"
        }`}
        disabled={page === pageCount}
        onClick={() => handlaPageChange(page + 1)}
      >
        next
      </button>
    </div>
  );
}

export default PaginationContainer;
