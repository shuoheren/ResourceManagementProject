import React from "react";

const ResourcedetailsUpdate = ({
  editingResource,
  setEditingResource,
  confirmUpdates,
}) => {
  const handleInputChange = (field) => (e) => {
    setEditingResource((prev) => ({
      ...prev,
      resourceDetails: {
        ...prev.resourceDetails,
        [field]: e.target.value,
      },
    }));
  };

  return (
    <div className="resource-detail-editor">
      <h4>Edit Resource Details</h4>
      <label>
        Resource Code:
        <input
          type="text"
          name="resourceCode"
          value={editingResource.resourceDetails?.resourceCode || ""}
          onChange={handleInputChange("resourceCode")}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          name="resourceDescription"
          value={editingResource.resourceDetails?.resourceDescription || ""}
          onChange={handleInputChange("resourceDescription")}
        />
      </label>
      <label>
        Cost:
        <input
          type="text"
          name="resourceCost"
          value={editingResource.resourceDetails?.resourceCost || ""}
          onChange={handleInputChange("resourceCost")}
        />
      </label>
      <button onClick={confirmUpdates}>Submit</button>
    </div>
  );
};

export default ResourcedetailsUpdate;
