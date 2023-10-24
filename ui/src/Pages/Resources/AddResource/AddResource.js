import React, { useState } from "react";
import "./AddResource.css";

const AddResource = ({ newResource, setNewResource, handleAddResource }) => {
  const [showModal, setShowModal] = useState(false);

  const submitResource = () => {
    handleAddResource();
    setShowModal(false);
  };

  return (
    <div className="parent-container">
      <button
        className="add-resource-button"
        onClick={() => setShowModal(true)}
      >
        +
      </button>

      {showModal && (
        <div className="modal">
          <button className="close-button" onClick={() => setShowModal(false)}>
            X
          </button>

          <h4>Create New Resource</h4>
          <label>
            Resource Name:
            <input
              type="text"
              name="resourceName"
              value={newResource.resourceName}
              onChange={(e) =>
                setNewResource((prev) => ({
                  ...prev,
                  resourceName: e.target.value,
                }))
              }
            />
          </label>

          <label>
            Resource Code:
            <input
              type="text"
              name="resourceCode"
              value={newResource.resourceDetails.resourceCode}
              onChange={(e) =>
                setNewResource((prev) => ({
                  ...prev,
                  resourceDetails: {
                    ...prev.resourceDetails,
                    resourceCode: e.target.value,
                  },
                }))
              }
            />
          </label>

          <label>
            Description:
            <input
              type="text"
              name="resourceDescription"
              value={newResource.resourceDetails.resourceDescription}
              onChange={(e) =>
                setNewResource((prev) => ({
                  ...prev,
                  resourceDetails: {
                    ...prev.resourceDetails,
                    resourceDescription: e.target.value,
                  },
                }))
              }
            />
          </label>

          <label>
            Cost:
            <input
              type="text"
              name="resourceCost"
              value={newResource.resourceDetails.resourceCost}
              onChange={(e) =>
                setNewResource((prev) => ({
                  ...prev,
                  resourceDetails: {
                    ...prev.resourceDetails,
                    resourceCost: e.target.value,
                  },
                }))
              }
            />
          </label>

          <button onClick={submitResource}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default AddResource;
