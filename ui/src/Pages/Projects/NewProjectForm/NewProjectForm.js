import React, { useState, useContext } from "react";
import axios from "axios";
import "./NewProjectForm.css";
import { AppContext } from "../../../Context/AppContext";
import { BASE_URL } from "../../../config/urls";

const NewProjectForm = ({ onNewProject }) => {
  const [newProjectName, setNewProjectName] = useState("");
  const { username } = useContext(AppContext);

  const handleCreateProject = () => {
    axios
      .post(`${BASE_URL}/projects/${username}/${newProjectName}`)
      .then((response) => {
        onNewProject();
        setNewProjectName(""); // Clear the input after successful creation
      })
      .catch((error) => {
        console.error("Error creating new project:", error);
      });
  };

  return (
    <div className="new-project-container">
      <input
        type="text"
        placeholder="New Project Name"
        value={newProjectName}
        onChange={(e) => setNewProjectName(e.target.value)}
      />
      <button onClick={handleCreateProject}>Create Project</button>
    </div>
  );
};

export default NewProjectForm;
