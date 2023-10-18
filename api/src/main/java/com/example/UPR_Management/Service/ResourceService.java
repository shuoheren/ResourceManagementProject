package com.example.UPR_Management.Service;

import com.example.UPR_Management.DTO.ResourceDTO;
import com.example.UPR_Management.Entity.Project;
import com.example.UPR_Management.Entity.Resource;
import com.example.UPR_Management.Entity.ResourceDetails;
import com.example.UPR_Management.Repo.ProjectRepository;
import com.example.UPR_Management.Repo.ResourceDetailsRepository;
import com.example.UPR_Management.Repo.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResourceService {

    @Autowired
    private final ResourceRepository resourceRepository;

    @Autowired
    private final ProjectRepository projectRepository;

    @Autowired
    private final ResourceDetailsRepository resourceDetailsRepository;

    public ResourceService(ResourceRepository resourceRepository, ProjectRepository projectRepository, ResourceDetailsRepository resourceDetailsRepository) {
        this.resourceRepository = resourceRepository;
        this.projectRepository = projectRepository;
        this.resourceDetailsRepository = resourceDetailsRepository;
    }

    public List<ResourceDTO> getAllResources() {
        List<Resource> resources = resourceRepository.findAll();
        return resources.stream()
                        .map(ResourceDTO::fromEntity)
                        .collect(Collectors.toList());
    }

    public ResourceDTO getResourceById(Long id) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Resource with id " + id + " does not exist"));
        return ResourceDTO.fromEntity(resource);
    }

    public ResourceDTO saveResource(ResourceDTO resourceDTO) {
        Resource resource = ResourceDTO.toEntity(resourceDTO);
        Resource savedResource = resourceRepository.save(resource);
        return ResourceDTO.fromEntity(savedResource);
    }

    public void deleteResource(Long id) {
        if(resourceRepository.existsById(id)) {
            resourceRepository.deleteById(id);
        } else {
            throw new IllegalStateException("Resource with id " + id + " does not exist");
        }
    }

    public void linkResourceToProject(Long resourceId, Long projectId) {
        Resource resource = resourceRepository.findById(resourceId)
            .orElseThrow(() -> new IllegalArgumentException("Resource not found"));
    
        Project project = projectRepository.findById(projectId)
            .orElseThrow(() -> new IllegalArgumentException("Project not found"));
    
        if(!resource.getProjects().contains(project)) {  // Check if the project is already linked to the resource
            resource.getProjects().add(project);
            project.getResources().add(resource);  // Update the owning side
    
            resourceRepository.save(resource);
            projectRepository.save(project); // Save the updated project as well
        }
    }

    public void unlinkResourceFromProject(Long resourceId, Long projectId) {
        Resource resource = resourceRepository.findById(resourceId)
            .orElseThrow(() -> new IllegalArgumentException("Resource not found"));
    
        Project project = projectRepository.findById(projectId)
            .orElseThrow(() -> new IllegalArgumentException("Project not found"));
    
        if(resource.getProjects().contains(project)) {  // Check if the project is linked to the resource
            resource.getProjects().remove(project);
            project.getResources().remove(resource);  // Update the owning side
    
            resourceRepository.save(resource);
            projectRepository.save(project); // Save the updated project as well
        }
    }
    






    public Resource createResourceWithDetails(Resource resource, ResourceDetails resourceDetails) {
        // Save the resource details
        ResourceDetails savedDetails = resourceDetailsRepository.save(resourceDetails);
    
        // Associate the saved details with the resource
        resource.setResourceDetails(savedDetails);
    
        // Save and return the resource
        return resourceRepository.save(resource);
    }

}
