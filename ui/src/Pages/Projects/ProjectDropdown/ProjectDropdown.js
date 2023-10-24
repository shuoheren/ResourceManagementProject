import React from "react";
import "./ProjectDropdown.css";

function ProjectDropdown({ projects, onSelect, selectedProject }) {
  return (
    <div className="project-dropdown">
      <select
        value={selectedProject?.projectId || ""}
        onChange={(e) => {
          const chosenProject = projects.find(
            (p) => p.projectId === parseInt(e.target.value, 10)
          );
          onSelect(chosenProject);
        }}
      >
        <option value="">Select a Project</option>
        {projects.map((project) => (
          <option key={project.projectId} value={project.projectId}>
            {project.projectName}
          </option>
        ))}
      </select>
    </div>
  );
}
export default ProjectDropdown;
