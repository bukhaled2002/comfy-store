import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

function ComplexPaginationContainer() {
  const { meta } = useLoaderData();
  const location = useLocation();
  const { page, pageCount } = meta.pagination;
  const navigate = useNavigate();
  console.log(page, pageCount);
  console.log(location);
  const handlaPageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", pageNumber);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        onClick={() => handlaPageChange(pageNumber)}
        className={`join-item btn btn-md ${activeClass && "btn-active"}`}
      >
        {pageNumber}
      </button>
    );
  };
  const renderButtons = () => {
    const pageButtons = [];
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));
    if (page > 2) {
      pageButtons.push(<button className="join-item btn btn-md">...</button>);
    }
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }));
    }
    if (page < pageCount - 1) {
      pageButtons.push(<button className="join-item btn btn-md">...</button>);
    }

    pageButtons.push(
      addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
    );
    return pageButtons;
  };
  return (
    <div className="join mt-16 flex justify-end">
      <button
        className={`join-item btn btn-md ${page === 1 && "cursor-not-allowed"}`}
        disabled={page === 1}
        onClick={() => handlaPageChange(page - 1)}
      >
        back
      </button>
      {renderButtons()}
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

export default ComplexPaginationContainer;
