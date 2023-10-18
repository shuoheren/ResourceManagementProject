package com.example.UPR_Management.Service;

import com.example.UPR_Management.DTO.ProjectDTO;
import com.example.UPR_Management.Entity.Project;
import com.example.UPR_Management.Entity.Resource;
import com.example.UPR_Management.Repo.ProjectRepository;
import com.example.UPR_Management.Repo.ResourceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired
    private final ProjectRepository projectRepository;

    @Autowired
    private ResourceRepository resourceRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<ProjectDTO> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        return projects.stream()
                .map(ProjectDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public ProjectDTO getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project with id " + id + " does not exist"));
        return ProjectDTO.fromEntity(project);
    }

    @Transactional
    public ProjectDTO saveOrUpdateProject(ProjectDTO projectDTO) {
        Project project = ProjectDTO.toEntity(projectDTO);
        for (Resource resource : project.getResources()) {
            resourceRepository.save(resource);
        }
        Project savedProject = projectRepository.save(project);
        return ProjectDTO.fromEntity(savedProject);
    }

    public ProjectDTO updateProject(Long id, ProjectDTO projectDTO) {
        if (!projectRepository.existsById(id)) {
            throw new EntityNotFoundException("Project with id " + id + " does not exist");
        }

        Project existingProject = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project with id " + id + " does not exist"));
        existingProject.setProjectName(projectDTO.getProjectName());
        // set other fields similarly using projectDTO...
        Project updatedProject = projectRepository.save(existingProject);
        return ProjectDTO.fromEntity(updatedProject);
    }

    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new EntityNotFoundException("Project with id " + id + " does not exist");
        }
        projectRepository.deleteById(id);
    }
}
