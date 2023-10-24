import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../Context/AppContext";
import "./ResourcePage.css";
import AddResource from "../AddResource/AddResource";
import ResourceTable from "../ResourceTable/ResourceTable";
import ResourcedetailsUpdate from "../ResourcedetailsUpdate/ResourcedetailsUpdate";

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

  const updateResourceDetails = async (resourceDetailsId, newDetails) => {
    try {
      await axios.put(
        `http://localhost:8085/resource-details/${resourceDetailsId}`,
        newDetails
      );
      // After updating the resource details, fetch the resources again to get the updated list.
      const resourcesResponse = await axios.get(
        "http://localhost:8085/resources"
      );
      setResources(resourcesResponse.data);
    } catch (error) {
      console.error("Error updating resource details:", error);
    }
  };

  const confirmUpdates = () => {
    if (editingResource) {
      updateResourceName(editingResource.id, editingResource.resourceName);
      updateResourceDetails(
        editingResource.resourceDetails.id,
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
      <ResourceTable resources={resources} onRowClick={handleRowClick} />
      {editingResource && (
        <ResourcedetailsUpdate
          editingResource={editingResource}
          setEditingResource={setEditingResource}
          confirmUpdates={confirmUpdates}
        />
      )}
    </div>
  );
};

export default ResourcePage;
