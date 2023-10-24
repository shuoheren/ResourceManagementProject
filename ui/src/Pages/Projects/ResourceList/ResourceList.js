import React, { useState } from "react";
import "./ResourceList.css";

function ResourceList({ resources, linkedResourceIds, onLink }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust this number as needed

  // Filter out the linked resources
  const unlinkedResources = resources.filter(
    (resource) => !linkedResourceIds.has(resource.resourceId)
  );

  const totalItems = unlinkedResources.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentItems = unlinkedResources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="resources-list">
      <h3>Unlinked Resources</h3>
      {currentItems.map((resource) => (
        <div key={resource.resourceId}>
          <span>{resource.resourceName}</span>
          <button
            className="link-unlink-button"
            onClick={() => onLink(resource.resourceId)}
          >
            +
          </button>
        </div>
      ))}
      <div className="pagination">
        <button onClick={() => handlePageChange("prev")}>Previous</button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => handlePageChange("next")}>Next</button>
      </div>
    </div>
  );
}

export default ResourceList;
