import React, { useState } from 'react';

const PAGINATION_OPTIONS = [10, 20, 30, 40, 50];

const WithPagination = (OriginalComponent) => {
  function NewComponent(props) {
    const [page, setPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const handleItemsPerPageChange = (e) => setItemsPerPage(e.target.value);

    return (
      <>
        <OriginalComponent page={page} itemsPerPage={itemsPerPage} setTotalItems={setTotalItems} />
        <div className="flex sticky bottom-7 z-50 items-center justify-center sm:justify-end gap-4 mb-3">
          <div className="flex items-center gap-1">
            <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
              {PAGINATION_OPTIONS.map((opt) => (
                <option value={opt}>{opt}</option>
              ))}
            </select>
            <label for="itemsPerPage">Items Per Page</label>
          </div>
          <div className="table border-collapse w-fit">
            <td className="table-cell border">
              <button
                className="px-2 enabled:hover:bg-purple-600 enabled:hover:text-white disabled:cursor-not-allowed"
                disabled={Boolean(page + 1 === 1)}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Prev
              </button>
            </td>
            <td className="table-cell border">
              <p className="px-2">{page + 1}</p>
            </td>
            <td className="table-cell border">
              <button
                className="px-2 enabled:hover:bg-purple-600 enabled:hover:text-white disabled:cursor-not-allowed"
                disabled={(page + 1) * itemsPerPage >= totalItems}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </button>
            </td>
          </div>
        </div>
      </>
    );
  }
  return NewComponent;
};

export default WithPagination;
