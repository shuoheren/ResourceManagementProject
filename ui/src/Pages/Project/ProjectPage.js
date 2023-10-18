import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProjectPage.css";
const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectCode, setNewProjectCode] = useState("");
  const [resources, setResources] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8085/projects")
      .then((response) => {
        setProjects(response.data);
        setFilteredProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
    axios
      .get("http://localhost:8085/resources")
      .then((response) => {
        setResources(response.data);
      })
      .catch((error) => {
        console.error("Error fetching resources:", error);
      });
  }, []);

  useEffect(() => {
    const results = projects.filter(
      (project) =>
        project &&
        project.projectName &&
        project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(results);
  }, [searchTerm, projects]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addProject = () => {
    const projectDTO = {
      projectName: newProjectName,
      projectCode: newProjectCode,
    };

    axios
      .post("http://localhost:8085/projects", projectDTO)
      .then((response) => {
        setProjects([...projects, response.data]);
        setNewProjectName("");
        setNewProjectCode("");
      })
      .catch((error) => {
        console.error("Error adding project:", error);
      });
  };

  const deleteProject = (projectId) => {
    axios
      .delete(`http://localhost:8085/projects/${projectId}`)
      .then(() => {
        setProjects(projects.filter((project) => project.id !== projectId));
      })
      .catch((error) => {
        console.error("Error deleting project:", error);
      });
  };
  return (
    <div className="project-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a project..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button>🔍</button>
      </div>

      <div className="content-wrapper">
        <div className="resources-list">
          <h3>Resources</h3>
          {resources.map((resource) => (
            <div key={resource.resourceId}>{resource.resourceName}</div>
          ))}
        </div>

        <div className="project-list">
          <h3>Project Catalog</h3>

          <div className="project-table">
            {filteredProjects.map((project) => (
              <div className="project-row" key={project.id}>
                <span>{project.projectName}</span>
                <span>{project.projectCode}</span>
                <button onClick={() => deleteProject(project.id)}>
                  Delete
                </button>
              </div>
            ))}

            {/* Your input for adding a new project remains unchanged */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
