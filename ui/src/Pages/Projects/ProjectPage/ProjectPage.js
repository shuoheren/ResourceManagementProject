import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../../Context/AppContext";
import "./ProjectPage.css";
import NewProjectForm from "../NewProjectForm/NewProjectForm";
import ProjectDropdown from "../ProjectDropdown/ProjectDropdown";
import ResourceList from "../ResourceList/ResourceList";
import LinkedResourceList from "../LinkedResourceList/LinkedResourceList";

const ProjectPage = () => {
  const { username } = useContext(AppContext);
  const [projects, setProjects] = useState([]);
  const [resources, setResources] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [linkedResourceIds, setLinkedResourceIds] = useState(new Set());
  const [newProjectName, setNewProjectName] = useState("");

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

  const fetchProjects = () => {
    axios
      .get("http://localhost:8085/projects")
      .then((response) => {
        setProjects(response.data.filter((p) => p.userName === username));
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  };

  useEffect(() => {
    fetchProjects();
    axios
      .get("http://localhost:8085/resources")
      .then((response) => {
        setResources(response.data);
      })
      .catch((error) => {
        console.error("Error fetching resources:", error);
      });
  }, []);

  const linkResourceToProject = (resourceId) => {
    if (selectedProject) {
      axios
        .post(
          `http://localhost:8085/resources/${resourceId}/linkToProject/${selectedProject.projectId}`
        )
        .then(() => {
          fetchProjectById(selectedProject.projectId);
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
        })
        .catch((error) => {
          console.error("Error unlinking resource from project:", error);
        });
    }
  };

  const handleCreateProject = () => {
    axios
      .post(`http://localhost:8085/projects/${username}/${newProjectName}`)
      .then((response) => {
        fetchProjects();
        setNewProjectName("");
      })
      .catch((error) => {
        console.error("Error creating new project:", error);
      });
  };

  return (
    <div className="project-container">
      <NewProjectForm onNewProject={fetchProjects} />
      <ProjectDropdown
        projects={projects}
        onSelect={handleProjectSelection}
        selectedProject={selectedProject}
      />
      <div className="content-wrapper">
        <ResourceList
          resources={resources}
          linkedResourceIds={linkedResourceIds}
          onLink={linkResourceToProject}
        />
        <LinkedResourceList
          resources={resources}
          linkedResourceIds={linkedResourceIds}
          onUnlink={unlinkResourceFromProject}
          selectedProject={selectedProject}
        />
      </div>
    </div>
  );
};

export default ProjectPage;
