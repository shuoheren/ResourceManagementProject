package com.example.UPR_Management.DTO;

import java.util.List;

import com.example.UPR_Management.Entity.Resource;

public class ResourceDTO {
    private Long resourceId;
    private String resourceName;
    private String resourceDetails;
    private List<Long> projectIds;

    // Getters, setters, constructors...

    public ResourceDTO() {
    }

    public void setResourceId(Long resourceId) {
        this.resourceId = resourceId;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public void setResourceDetails(String resourceDetails) {
        this.resourceDetails = resourceDetails;
    }

    public Long getResourceId() {
        return resourceId;
    }

    public String getResourceName() {
        return resourceName;
    }

    public String getResourceDetails() {
        return resourceDetails;
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
        
        // Handle the resourceDetails conversion if it's complex...
        return dto;
    }
}
