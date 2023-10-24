import React, { useState } from "react";

function LinkedResourceList({
  resources,
  linkedResourceIds,
  onUnlink,
  selectedProject,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust this number as needed

  const totalItems = Array.from(linkedResourceIds).length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentItems = Array.from(linkedResourceIds).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="selected-resources-list">
      <h3>
        Linked Resources for Project:
        {selectedProject?.projectName || "None"}
      </h3>
      {currentItems.map((resourceId) => {
        const resource = resources.find((r) => r.resourceId === resourceId);
        return (
          <div key={resourceId}>
            <span>{resource.resourceName}</span>
            <button
              className="link-unlink-button"
              onClick={() => onUnlink(resourceId)}
            >
              -
            </button>
          </div>
        );
      })}
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

export default LinkedResourceList;
