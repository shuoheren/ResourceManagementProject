import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../Context/AppContext";
import "./ResourcePage.css";
import AddResource from "../AddResource/AddResource";

const ResourcePage = () => {
  const { username: currentUsername } = useContext(AppContext);

  const [resources, setResources] = useState([]);
  const [editingResource, setEditingResource] = useState(null);
  const [newResource, setNewResource] = useState({
    resourceName: "",
    resourceDetails: {
      resourceCode: "",
      resourceDescription: "",
      resourceCost: "",
    },
  });

  useEffect(() => {
    axios
      .get("http://localhost:8085/resources")
      .then((response) => {
        setResources(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleAddResource = async () => {
    try {
      const resourceResponse = await axios.post(
        "http://localhost:8085/resources",
        newResource
      );
      const resourceDetailsResponse = await axios.post(
        "http://localhost:8085/resource-details",
        newResource.resourceDetails
      );

      await axios.post(
        `http://localhost:8085/resources/${resourceResponse.data.resourceId}/linkDetails/${resourceDetailsResponse.data.id}`
      );

      const resourcesResponse = await axios.get(
        "http://localhost:8085/resources"
      );
      setResources(resourcesResponse.data);
    } catch (error) {
      console.error("Error adding new resource:", error);
    }
  };

  const handleRowClick = (resource) => {
    setEditingResource({ ...resource });
  };

  const updateResourceName = (resourceId, newName) => {
    axios
      .put(`http://localhost:8085/resources/${resourceId}/name`, {
        name: newName,
      })
      .then(() => {
        // Update the frontend state if needed
      })
      .catch((error) => {
        console.error("Error updating resource name:", error);
      });
  };

  const updateResourceDetails = async (resourceId, newDetails) => {
    try {
      const resourceDetailsResponse = await axios.post(
        "http://localhost:8085/resource-details",
        newDetails
      );

      await axios.post(
        `http://localhost:8085/resources/${resourceId}/linkDetails/${resourceDetailsResponse.data.id}`
      );

      // Fetch updated resources or update the frontend state directly
    } catch (error) {
      console.error("Error updating resource details:", error);
    }
  };

  const confirmUpdates = () => {
    if (editingResource) {
      updateResourceName(editingResource.id, editingResource.resourceName);
      updateResourceDetails(
        editingResource.id,
        editingResource.resourceDetails
      );
    }
  };
  return (
    <div className="resource-container">
      <AddResource
        newResource={newResource}
        setNewResource={setNewResource}
        handleAddResource={handleAddResource}
      />
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
          {resources.map((resource) => (
            <tr key={resource.id} onClick={() => handleRowClick(resource)}>
              <td>{resource.resourceName}</td>
              <td>{resource.resourceDetails?.resourceCode}</td>
              <td>{resource.resourceDetails?.resourceDescription}</td>
              <td>{resource.resourceDetails?.creationDate}</td>
              <td>{resource.resourceDetails?.modifiedDate}</td>
              <td>{resource.resourceDetails?.resourceCost}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingResource && (
        <div className="resource-detail-editor">
          <h4>Edit Resource Details</h4>

          <label>
            Resource Code:
            <input
              type="text"
              name="resourceCode"
              value={editingResource.resourceDetails?.resourceCode || ""}
              onChange={(e) =>
                setEditingResource((prev) => ({
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
              value={editingResource.resourceDetails?.resourceDescription || ""}
              onChange={(e) =>
                setEditingResource((prev) => ({
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
              value={editingResource.resourceDetails?.resourceCost || ""}
              onChange={(e) =>
                setEditingResource((prev) => ({
                  ...prev,
                  resourceDetails: {
                    ...prev.resourceDetails,
                    resourceCost: e.target.value,
                  },
                }))
              }
            />
          </label>

          <button onClick={confirmUpdates}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default ResourcePage;
