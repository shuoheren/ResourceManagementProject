package com.example.UPR_Management.Controller;

import com.example.UPR_Management.Entity.ResourceDetails;
import com.example.UPR_Management.Service.ResourceDetailsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/resource-details")
public class ResourceDetailsController {

    private final ResourceDetailsService resourceDetailsService;

    // Constructor Injection
    public ResourceDetailsController(ResourceDetailsService resourceDetailsService) {
        this.resourceDetailsService = resourceDetailsService;
    }

    @GetMapping
    public ResponseEntity<List<ResourceDetails>> getAllResourceDetails() {
        return ResponseEntity.ok(resourceDetailsService.getAllResourceDetails());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResourceDetails> getResourceDetailsById(@PathVariable Long id) {
        return resourceDetailsService.getResourceDetailsById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<String> addResourceDetails(@RequestBody ResourceDetails resourceDetails) {
        resourceDetailsService.saveResourceDetails(resourceDetails);
        return ResponseEntity.status(HttpStatus.CREATED).body("ResourceDetails added successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateResourceDetails(@PathVariable Long id, @RequestBody ResourceDetails resourceDetails) {
        resourceDetailsService.saveResourceDetails(resourceDetails);
        return ResponseEntity.ok("ResourceDetails updated successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteResourceDetails(@PathVariable Long id) {
        resourceDetailsService.deleteResourceDetails(id);
        return ResponseEntity.ok("ResourceDetails deleted successfully");
    }
}