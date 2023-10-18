import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ResourcePage.css";

const ResourcePage = (currentUsername) => {
  const [resources, setResources] = useState([]);
  const [newResourceName, setNewResourceName] = useState("");
  const [newResourceCode, setNewResourceCode] = useState("");

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

  const addResource = () => {
    const resourceDTO = {
      resourceName: newResourceName,
      resourceCode: newResourceCode,
    };

    axios
      .post("http://localhost:8085/resources", resourceDTO)
      .then((response) => {
        setResources([...resources, response.data]);
        setNewResourceName("");
        setNewResourceCode("");
      })
      .catch((error) => {
        console.error("Error adding resource:", error);
      });
  };

  const deleteResource = (resourceId) => {
    axios
      .delete(`http://localhost:8085/resources/${resourceId}`)
      .then(() => {
        setResources(
          resources.filter((resource) => resource.resourceId !== resourceId)
        );
      })
      .catch((error) => {
        console.error("Error deleting resource:", error);
      });
  };

  return (
    <div className="resource-container">
      <div className="search-bar">
        <input type="text" placeholder="Keyword" />
        <button>🔍</button>
      </div>

      <div className="resource-list">
        <h3>Resource Catalog</h3>

        <div className="resource-table">
          {resources.map((resource) => (
            <div className="resource-row" key={resource.resourceId}>
              <span>{resource.resourceName}</span>
              <span>{resource.resourceCode}</span>
              <button onClick={() => deleteResource(resource.resourceId)}>
                Delete
              </button>
            </div>
          ))}

          <div className="resource-input">
            <input
              type="text"
              placeholder="Resource Name"
              value={newResourceName}
              onChange={(e) => setNewResourceName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Resource Code"
              value={newResourceCode}
              onChange={(e) => setNewResourceCode(e.target.value)}
            />
            <button onClick={addResource}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcePage;
