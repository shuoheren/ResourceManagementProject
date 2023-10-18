package com.example.UPR_Management.Controller;

import com.example.UPR_Management.DTO.ProjectDTO;
import com.example.UPR_Management.Service.ProjectService;
import com.example.UPR_Management.Service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    @Autowired
    private final ProjectService projectService;

    @Autowired
    private final ResourceService resourceService;

    public ProjectController(ProjectService projectService, ResourceService resourceService) {
        this.projectService = projectService;
        this.resourceService = resourceService;
    }

    @GetMapping
    public ResponseEntity<List<ProjectDTO>> getAllProjects() {
        List<ProjectDTO> projectDTOs = projectService.getAllProjects();
        return ResponseEntity.ok(projectDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDTO> getProjectById(@PathVariable Long id) {
        ProjectDTO projectDTO = projectService.getProjectById(id);
        if (projectDTO != null) {
            return ResponseEntity.ok(projectDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{username}/{projectName}")
    public ResponseEntity<ProjectDTO> createProjectWithUsername(
        @PathVariable String username,
        @PathVariable String projectName) {
    ProjectDTO savedProjectDTO = projectService.createProjectWithUsername(username, projectName);
    return ResponseEntity.ok(savedProjectDTO);
}


    @PutMapping("/{id}")
    public ResponseEntity<ProjectDTO> updateProject(@PathVariable Long id, @RequestBody ProjectDTO projectDTO) {
        ProjectDTO updatedProjectDTO = projectService.updateProject(id, projectDTO);
        if (updatedProjectDTO != null) {
            return ResponseEntity.ok(updatedProjectDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable Long id) {
        try {
            projectService.deleteProject(id);
            return ResponseEntity.ok("Project deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting the project.");
        }
    }

    @PostMapping("/{projectId}/addUser/{userName}")
    public ResponseEntity<String> addProjectToUser(@PathVariable Long projectId, @PathVariable String userName) {
        try {
            projectService.addProjectToUser(projectId, userName);
            return ResponseEntity.ok("Project added to user successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error adding project to user: " + e.getMessage());
        }
    }
}
