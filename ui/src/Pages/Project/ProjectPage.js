import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProjectPage.css";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [resources, setResources] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedResources, setSelectedResources] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8085/projects")
      .then((response) => {
        setProjects(response.data);
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

  const handleProjectSelection = (project) => {
    setSelectedProject(project);

    if (project && project.linkedResources) {
      setSelectedResources(project.linkedResources);
    } else {
      setSelectedResources([]);
    }
  };

  const linkResourceToProject = (resourceId) => {
    if (selectedProject) {
      axios
        .post(
          `http://localhost:8085/resources/${resourceId}/linkToProject/${selectedProject.projectId}`
        )
        .then(() => {
          setSelectedResources((prevResources) => [
            ...prevResources,
            resourceId,
          ]);
        })
        .catch((error) => {
          console.error("Error linking resource to project:", error);
        });
    }
  };

  const unlinkResourceFromProject = (resourceId) => {
    if (selectedProject) {
      axios
        .delete(
          `http://localhost:8085/resources/${resourceId}/unlinkFromProject/${selectedProject.projectId}`
        )
        .then(() => {
          setSelectedResources((prevResources) =>
            prevResources.filter((id) => id !== resourceId)
          );
        })
        .catch((error) => {
          console.error("Error unlinking resource from project:", error);
        });
    }
  };
  return (
    <div className="project-container">
      {/* Project Selection Dropdown */}
      <div className="project-dropdown">
        <select
          value={selectedProject?.projectId || ""}
          onChange={(e) => {
            const chosenProject = projects.find(
              (p) => p.projectId === parseInt(e.target.value, 10)
            );
            handleProjectSelection(chosenProject);
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

      <div className="content-wrapper">
        <div className="resources-list">
          <h3>Unlinked Resources</h3>
          {resources.map(
            (resource) =>
              !selectedResources.includes(resource.resourceId) && (
                <div key={resource.resourceId}>
                  <span>{resource.resourceName}</span>
                  <button
                    onClick={() => linkResourceToProject(resource.resourceId)}
                  >
                    Link
                  </button>
                </div>
              )
          )}
        </div>

        <div className="selected-resources-list">
          <h3>
            Linked Resources for Project:{" "}
            {selectedProject?.projectName || "None"}
          </h3>
          {selectedResources.map((resourceId) => {
            const resource = resources.find((r) => r.resourceId === resourceId);
            return resource ? (
              <div key={resourceId}>
                <span>{resource.resourceName}</span>
                <button onClick={() => unlinkResourceFromProject(resourceId)}>
                  Unlink
                </button>
              </div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};
export default ProjectPage;
