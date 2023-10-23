package com.example.UPR_Management.DTO.Resource;

import java.util.Date;

public class UpdateResourceDTO {

    // Fields for Resource entity
    private Long resourceId;
    private String resourceName;

    // Fields for ResourceDetails entity
    private String resourceCode;
    private String resourceDescription;
    private Date creationDate; // If you want to update it, otherwise remove
    private Date modifiedDate;
    private Double resourceCost;

    // Standard getters and setters for each field

    public Long getResourceId() {
        return resourceId;
    }

    public void setResourceId(Long resourceId) {
        this.resourceId = resourceId;
    }

    public String getResourceName() {
        return resourceName;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public String getResourceCode() {
        return resourceCode;
    }

    public void setResourceCode(String resourceCode) {
        this.resourceCode = resourceCode;
    }

    public String getResourceDescription() {
        return resourceDescription;
    }

    public void setResourceDescription(String resourceDescription) {
        this.resourceDescription = resourceDescription;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Date getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate() {
        this.modifiedDate = new Date();
    }
    public void setCreateDate() {
        this.creationDate = new Date();
    }

    public Double getResourceCost() {
        return resourceCost;
    }

    public void setResourceCost(Double resourceCost) {
        this.resourceCost = resourceCost;
    }
}
