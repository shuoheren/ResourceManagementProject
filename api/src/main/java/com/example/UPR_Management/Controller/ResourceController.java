package com.example.UPR_Management.Controller;

import com.example.UPR_Management.DTO.ResourceDTO;
import com.example.UPR_Management.Service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/resources")
public class ResourceController {

    @Autowired
    private final ResourceService resourceService;

    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
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

    @PutMapping("/{id}")
    public ResponseEntity<ResourceDTO> updateResource(@PathVariable Long id, @RequestBody ResourceDTO resourceDTO) {
        // Assuming that the resource with the given ID should be updated to the details of the provided resourceDTO
        ResourceDTO updatedResourceDTO = resourceService.saveResource(resourceDTO);
        return ResponseEntity.ok(updatedResourceDTO);
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
}
