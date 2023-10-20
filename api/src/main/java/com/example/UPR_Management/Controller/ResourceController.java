package com.example.UPR_Management.Controller;

import com.example.UPR_Management.DTO.ResourceDTO;
import com.example.UPR_Management.DTO.Resource.UpdateResourceDTO;
import com.example.UPR_Management.Entity.Resource;
import com.example.UPR_Management.Entity.ResourceDetails;
import com.example.UPR_Management.Service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import javax.transaction.Transactional;

@RestController
@RequestMapping("/resources")
public class ResourceController {

    @Autowired
    private final ResourceService resourceService;

    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @Transactional
    @PostMapping("/{resourceId}/linkToProject/{projectId}")
    public ResponseEntity<String> linkResourceToProject(
            @PathVariable Long resourceId,
            @PathVariable Long projectId) {

        resourceService.linkResourceToProject(resourceId, projectId);
        return ResponseEntity.ok("Resource linked to project successfully");
    }

    @Transactional
    @DeleteMapping("/{resourceId}/unlinkFromProject/{projectId}")
    public ResponseEntity<String> unlinkResourceFromProject(
            @PathVariable Long resourceId,
            @PathVariable Long projectId) {

        try {
            resourceService.unlinkResourceFromProject(resourceId, projectId);
            return ResponseEntity.ok("Resource unlinked from project successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error unlinking resource from project.");
        }
    }

    @Transactional
    @PostMapping("/{resourceId}/linkDetails/{detailId}")
    public ResponseEntity<String> linkResourceToDetails(
            @PathVariable Long resourceId,
            @PathVariable Long detailId) {

        try {
            resourceService.linkResourceToDetails(resourceId, detailId);
            return ResponseEntity.ok("Resource linked to details successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error linking resource to details.");
        }
    }

    @Transactional
    @DeleteMapping("/{resourceId}/unlinkDetails")
    public ResponseEntity<String> unlinkResourceFromDetails(
            @PathVariable Long resourceId) {

        try {
            resourceService.unlinkResourceFromDetails(resourceId);
            return ResponseEntity.ok("Resource unlinked from details successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error unlinking resource from details.");
        }
    }






    @GetMapping
    public ResponseEntity<List<ResourceDTO>> getAllResources() {
        List<ResourceDTO> resourceDTOs = resourceService.getAllResources();
        return ResponseEntity.ok(resourceDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResourceDTO> getResourceById(@PathVariable Long id) {
        ResourceDTO resourceDTO = resourceService.getResourceById(id);
        if (resourceDTO != null) {
            return ResponseEntity.ok(resourceDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<ResourceDTO> addResource(@RequestBody ResourceDTO resourceDTO) {
        ResourceDTO savedResourceDTO = resourceService.saveResource(resourceDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedResourceDTO);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteResource(@PathVariable Long id) {
        try {
            resourceService.deleteResource(id);
            return ResponseEntity.ok("Resource deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting the resource.");
        }
    }


    @PostMapping("/createWithDetails")
    public ResponseEntity<Resource> createResourceWithDetails(
            @RequestBody Resource resource,
            @RequestBody ResourceDetails resourceDetails) {

        Resource savedResource = resourceService.createResourceWithDetails(resource, resourceDetails);
        return ResponseEntity.ok(savedResource);
    }

    @Transactional
    @PutMapping("/{id}")
    public void updateResource(@PathVariable Long id, @RequestBody ResourceDTO ResourceDTO) {
        resourceService.updateResource(id,ResourceDTO); 
    }

    @Transactional
    @PutMapping("/name/{resourceId}/{name}")
    public ResponseEntity<String> updateResourceName(
            @PathVariable Long resourceId,
            @PathVariable String name) {

        try {
            resourceService.updateResourceName(resourceId, name);
            return ResponseEntity.ok("Resource name updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating resource name.");
        }
    }

}
