package com.example.UPR_Management.DTO;
import java.util.List;
import java.util.stream.Collectors;
import com.example.UPR_Management.Entity.Resource;

public class ResourceDetailsDTO {
  private Long id;
  private String resourceCode;
  private String resourceDescription;
  private Double resourceCost;

  public ResourceDetailsDTO() {
  }
  public void setId(Long id) {
    this.id = id;
  }

  public void setResourceCode(String resourceCode) {
    this.resourceCode = resourceCode;
  }

  public void setResourceDescription(String resourceDescription) {
    this.resourceDescription = resourceDescription;
  }

  public void setResourceCost(Double resourceCost) {
    this.resourceCost = resourceCost;
  }

  public Long getId() {
    return id;
  }

  public String getResourceCode() {
    return resourceCode;
  }

  public String getResourceDescription() {
    return resourceDescription;
  }

  public Double getResourceCost() {
    return resourceCost;
  }

  public static ResourceDetailsDTO toDTO(Resource resource) {
    ResourceDetailsDTO dto = new ResourceDetailsDTO();
    dto.setId(resource.getResourceDetails().getId());
    dto.setResourceCode(resource.getResourceDetails().getResourceCode());
    dto.setResourceDescription(resource.getResourceDetails().getResourceDescription());
    dto.setResourceCost(resource.getResourceDetails().getResourceCost());
    return dto;
  } 
}
