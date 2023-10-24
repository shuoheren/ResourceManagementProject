import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../../Context/AppContext";
import "./ProjectPage.css";

const ProjectPage = () => {
  const { username } = useContext(AppContext);
  const [projects, setProjects] = useState([]);
  const [resources, setResources] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [linkedResourceIds, setLinkedResourceIds] = useState(new Set());
  const [newProjectName, setNewProjectName] = useState("");
  const [currentPageLinked, setCurrentPageLinked] = useState(1);
  const [currentPageUnlinked, setCurrentPageUnlinked] = useState(1);
  const itemsPerPage = 10;

  const fetchProjectById = (projectId) => {
    axios
      .get(`http://localhost:8085/projects/${projectId}`)
      .then((response) => {
        const updatedProject = response.data;
        setSelectedProject(updatedProject);
        setLinkedResourceIds(new Set(updatedProject.resourceIds));
      })
      .catch((error) => {
        console.error(`Error fetching project with ID ${projectId}:`, error);
      });
  };

  const handleProjectSelection = (project) => {
    setSelectedProject(project);
    if (project && project.projectId) {
      fetchProjectById(project.projectId);
    }
  };

  useEffect(() => {
    if (selectedProject && selectedProject.resourceIds) {
      setLinkedResourceIds(new Set(selectedProject.resourceIds));
    } else {
      setLinkedResourceIds(new Set());
    }
  }, [selectedProject]);

  useEffect(() => {
    axios
      .get("http://localhost:8085/projects")
      .then((response) => {
        setProjects(
          response.data.filter((p) => p.userName === AppContext.username)
        );
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

  const updateProjectsList = () => {
    axios
      .get("http://localhost:8085/projects")
      .then((response) => {
        setProjects(
          response.data.filter((p) => p.userName === AppContext.username)
        );
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  };

  const linkResourceToProject = (resourceId) => {
    if (selectedProject) {
      axios
        .post(
          `http://localhost:8085/resources/${resourceId}/linkToProject/${selectedProject.projectId}`
        )
        .then(() => {
          fetchProjectById(selectedProject.projectId);
          updateProjectsList();
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
          fetchProjectById(selectedProject.projectId);
          updateProjectsList();
        })
        .catch((error) => {
          console.error("Error unlinking resource from project:", error);
        });
    }
  };

  const handleCreateProject = () => {
    axios
      .post(
        `http://localhost:8085/projects/${AppContext.username}/${newProjectName}`
      )
      .then((response) => {
        setProjects((prevProjects) => [...prevProjects, response.data]);
        setNewProjectName("");
      })
      .catch((error) => {
        console.error("Error creating new project:", error);
      });
  };

  const paginate = (data, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const paginatedUnlinkedResources = paginate(
    resources.filter((resource) => !linkedResourceIds.has(resource.resourceId)),
    currentPageUnlinked,
    itemsPerPage
  );

  const paginatedLinkedResourceIds = paginate(
    Array.from(linkedResourceIds),
    currentPageLinked,
    itemsPerPage
  );

  return (
    <div className="project-container">
      <div className="new-project-container">
        <input
          type="text"
          placeholder="New Project Name"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
        />
        <button onClick={handleCreateProject}>Create Project</button>
      </div>

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
          {paginatedUnlinkedResources.map((resource) => (
            <div key={resource.resourceId}>
              <span>{resource.resourceName}</span>
              <button
                className="link-unlink-button"
                onClick={() => linkResourceToProject(resource.resourceId)}
              >
                Link
              </button>
            </div>
          ))}
          <div className="pagination">
            <button
              disabled={currentPageUnlinked === 1}
              onClick={() => setCurrentPageUnlinked((prev) => prev - 1)}
            >
              Previous
            </button>
            <button
              disabled={paginatedUnlinkedResources.length < itemsPerPage}
              onClick={() => setCurrentPageUnlinked((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>

        <div className="selected-resources-list">
          <h3>
            Linked Resources for Project:
            {selectedProject?.projectName || "None"}
          </h3>
          {paginatedLinkedResourceIds.map((resourceId) => {
            const resource = resources.find((r) => r.resourceId === resourceId);
            return (
              <div key={resourceId}>
                <span>{resource.resourceName}</span>
                <button
                  className="link-unlink-button"
                  onClick={() => unlinkResourceFromProject(resourceId)}
                >
                  Unlink
                </button>
              </div>
            );
          })}
          <div className="pagination">
            <button
              disabled={currentPageLinked === 1}
              onClick={() => setCurrentPageLinked((prev) => prev - 1)}
            >
              Previous
            </button>
            <button
              disabled={paginatedLinkedResourceIds.length < itemsPerPage}
              onClick={() => setCurrentPageLinked((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
