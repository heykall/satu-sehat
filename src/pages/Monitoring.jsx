import React, { useState } from "react";

const Monitoring = () => {
  const [data, setData] = useState([
    { resourceId: 1, resourceType: "Type A", status: "Active" },
    { resourceId: 2, resourceType: "Type B", status: "Inactive" },
    { resourceId: 3, resourceType: "Type C", status: "Active" },
    { resourceId: 1, resourceType: "Type A", status: "Active" },
    { resourceId: 2, resourceType: "Type B", status: "Inactive" },
    { resourceId: 3, resourceType: "Type C", status: "Active" },
    { resourceId: 1, resourceType: "Type A", status: "Active" },
    { resourceId: 2, resourceType: "Type B", status: "Inactive" },
    { resourceId: 3, resourceType: "Type C", status: "Active" },
    { resourceId: 1, resourceType: "Type A", status: "Active" },
    { resourceId: 2, resourceType: "Type B", status: "Inactive" },
    { resourceId: 3, resourceType: "Type C", status: "Active" },
    { resourceId: 1, resourceType: "Type A", status: "Active" },
    { resourceId: 2, resourceType: "Type B", status: "Inactive" },
    { resourceId: 3, resourceType: "Type C", status: "Active" },
    { resourceId: 1, resourceType: "Type A", status: "Active" },
    { resourceId: 2, resourceType: "Type B", status: "Inactive" },
    { resourceId: 3, resourceType: "Type C", status: "Active" },
    { resourceId: 1, resourceType: "Type A", status: "Active" },
    { resourceId: 2, resourceType: "Type B", status: "Inactive" },
    { resourceId: 3, resourceType: "Type C", status: "Active" },
    { resourceId: 1, resourceType: "Type A", status: "Active" },
    { resourceId: 2, resourceType: "Type B", status: "Inactive" },
    { resourceId: 3, resourceType: "Type C", status: "Active" },
    { resourceId: 1, resourceType: "Type A", status: "Active" },
    { resourceId: 2, resourceType: "Type B", status: "Inactive" },
    { resourceId: 3, resourceType: "Type C", status: "Active" },
    { resourceId: 1, resourceType: "Type A", status: "Active" },
    { resourceId: 2, resourceType: "Type B", status: "Inactive" },
    { resourceId: 3, resourceType: "Type C", status: "Active" },
    { resourceId: 1, resourceType: "Type A", status: "Active" },
    { resourceId: 2, resourceType: "Type B", status: "Inactive" },
    { resourceId: 3, resourceType: "Type C", status: "Active" },
    { resourceId: 1, resourceType: "Type A", status: "Active" },
    { resourceId: 2, resourceType: "Type B", status: "Inactive" },
    { resourceId: 3, resourceType: "Type C", status: "Active" },
    { resourceId: 1, resourceType: "Type A", status: "Active" },
    { resourceId: 2, resourceType: "Type B", status: "Inactive" },
    { resourceId: 3, resourceType: "Type C", status: "Active" },
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
              <td className="py-2 px-4">{item.resourceId}</td>
              <td className="py-2 px-4">{item.resourceType}</td>
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
