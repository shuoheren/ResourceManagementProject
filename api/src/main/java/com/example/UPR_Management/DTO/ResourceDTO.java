package com.example.UPR_Management.DTO;

import java.util.List;
import java.util.stream.Collectors;

import com.example.UPR_Management.Entity.Resource;
import com.example.UPR_Management.Entity.ResourceDetails;

public class ResourceDTO {
    private Long resourceId;
    private String resourceName;
    private ResourceDetails resourceDetails;
    private List<Long> projectIds;

    // Getters, setters, constructors...


    public List<Long> getProjectIds() {
        return projectIds;
    }

    public void setProjectIds(List<Long> projectIds) {
        this.projectIds = projectIds;
    }

    public ResourceDTO() {
    }

    public void setResourceId(Long resourceId) {
        this.resourceId = resourceId;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public Long getResourceId() {
        return resourceId;
    }

    public String getResourceName() {
        return resourceName;
    }

    public ResourceDetails getResourceDetails() {
        return resourceDetails;
    }

    public void setResourceDetails(ResourceDetails resourceDetails) {
        this.resourceDetails = resourceDetails;
    }
    

    public static Resource toEntity(ResourceDTO dto) {
        Resource resource = new Resource();
        resource.setResourceId(dto.getResourceId());
        resource.setResourceName(dto.getResourceName());
        // Handle the resourceDetails conversion if it's complex...
        return resource;
    }

    public static ResourceDTO fromEntity(Resource resource) {
        ResourceDTO dto = new ResourceDTO();
        dto.setResourceId(resource.getResourceId());
        dto.setResourceName(resource.getResourceName());
        dto.setResourceDetails(resource.getResourceDetails());
        dto.setProjectIds(resource.getProjects().stream().map(project -> project.getProjectId()).collect(Collectors.toList()));
        
        // Handle the resourceDetails conversion if it's complex...
        return dto;
    }
}
