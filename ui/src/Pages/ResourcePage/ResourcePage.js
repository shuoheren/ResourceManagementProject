import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../Context/AppContext";
import "./ResourcePage.css";

const ResourcePage = () => {
  const { username: currentUsername } = useContext(AppContext);

  const [resources, setResources] = useState([]);
  const [editingResource, setEditingResource] = useState(null);
  const [newResource, setNewResource] = useState({
    resourceName: "",
    resourceDetails: {
      resourceCode: "",
      resourceDescription: "",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingResource((prevResource) => ({
      ...prevResource,
      [name]: value,
    }));
  };

  const confirmUpdates = () => {
    if (editingResource) {
      axios
        .put(
          `http://localhost:8085/resource-details/${editingResource.id}`,
          editingResource
        )
        .then(() => {
          const updatedResources = resources.map((resource) =>
            resource.id === editingResource.id ? editingResource : resource
          );
          setResources(updatedResources);
          setEditingResource(null);
        })
        .catch((error) => {
          console.error("Error updating resource details:", error);
        });
    }
  };

  return (
    <div className="resource-container">
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

        <button onClick={handleAddResource}>Submit</button>
      </div>

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
        </div>
      )}
    </div>
  );
};

export default ResourcePage;
