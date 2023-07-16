import React, { useState } from "react";

const Monitoring = () => {
  const [data, setData] = useState([
    { "resource_id": "e0abf064-e7f4-4e67-88ac-6c9c1061e137", "resource_type": "Patient", "status": "Success" },
      { "resource_id": "4a8d33d8-9f8b-4e85-9f18-8d6f36b9eb0e", "resource_type": "Patient", "status": "Success" },
      { "resource_id": "b68df5b0-8939-468e-9abf-32a2d994e24d", "resource_type": "Patient", "status": "Failed" }
    // Add more data here
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const renderPaginationLinks = () => {
    const pageNumbers = [];
    const visiblePages = 3;
    const middleIndex = Math.floor(visiblePages / 2);
    const startPage = currentPage - middleIndex;
    const endPage = currentPage + middleIndex;

    let i = startPage > 0 ? startPage : 1;
    while (i <= endPage && i <= totalPages) {
      pageNumbers.push(i);
      i++;
    }

    return (
      <>
        <a
          href="#"
          className="py-2 px-3 bg-teal-100 text-gray-700 hover:bg-teal-200"
          onClick={handleFirstPage}
        >
          First
        </a>
        {pageNumbers.map((pageNumber) => (
          <a
            key={pageNumber}
            href="#"
            className={`py-2 px-3 ${
              pageNumber === currentPage
                ? "bg-teal-500 text-white font-medium"
                : "bg-teal-100 text-gray-700"
            } hover:bg-teal-200`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </a>
        ))}
        <a
          href="#"
          className="py-2 px-3 bg-teal-100 text-gray-700 hover:bg-teal-200"
          onClick={handleLastPage}
        >
          Last
        </a>
      </>
    );
  };

  return (
    <div className="w-full">
      <table className="min-w-full">
        <thead>
          <tr className="bg-teal-500 text-white">
            <th className="py-2 px-4">Resource ID</th>
            <th className="py-2 px-4">Resource Type</th>
            <th className="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-teal-100" : "bg-teal-200"}
            >
              <td className="py-2 px-4">{item.resource_id}</td>
              <td className="py-2 px-4">{item.resource_type}</td>
              <td className="py-2 px-4">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        <nav className="inline-flex rounded-md shadow">
          {renderPaginationLinks()}
        </nav>
      </div>
    </div>
  );
};

export default Monitoring;
