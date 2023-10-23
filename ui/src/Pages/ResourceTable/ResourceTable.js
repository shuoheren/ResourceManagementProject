import React from "react";
import "./ResourceTable.css";

const formatDate = (isoString) => {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(isoString)
    .toLocaleString("en-US", options)
    .replace(",", "")
    .replace(":", ",")
    .replace(" AM", "")
    .replace(" PM", "");
};

const ResourceTable = ({ resources, onRowClick }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(resources.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResources = resources.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Resource Name</th>
            <th>Resource Code</th>
            <th>Description</th>
            <th>Creation Date</th>
            <th>Modified Date</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {currentResources.map((resource) => (
            <tr key={resource.id} onClick={() => onRowClick(resource)}>
              <td>{resource.resourceName}</td>
              <td>{resource.resourceDetails?.resourceCode}</td>
              <td>{resource.resourceDetails?.resourceDescription}</td>
              <td>
                {resource.resourceDetails?.creationDate
                  ? formatDate(resource.resourceDetails.creationDate)
                  : ""}
              </td>
              <td>
                {resource.resourceDetails?.modifiedDate
                  ? formatDate(resource.resourceDetails.modifiedDate)
                  : ""}
              </td>
              <td>{resource.resourceDetails?.resourceCost}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
          First
        </button>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default ResourceTable;
