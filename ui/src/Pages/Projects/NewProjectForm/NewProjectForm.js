import React from "react";

const NewProjectForm = ({
  newProjectName,
  setNewProjectName,
  handleCreateProject,
}) => (
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

export default NewProjectForm;
