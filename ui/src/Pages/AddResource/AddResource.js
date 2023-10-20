import React from "react";
import "./AddResource.css";
import { AppContext } from "../../Context/AppContext";

const AddResource = ({ newResource, setNewResource, handleAddResource }) => {
  return (
    <div className="resource-input-section">
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

      <button onClick={handleAddResource}>Submit</button>
    </div>
  );
};

export default AddResource;
