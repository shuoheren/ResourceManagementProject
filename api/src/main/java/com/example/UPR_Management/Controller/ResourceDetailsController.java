package com.example.UPR_Management.Controller;

import com.example.UPR_Management.Entity.ResourceDetails;
import com.example.UPR_Management.Service.ResourceDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/resource-details")
public class ResourceDetailsController {

    @Autowired
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
    public ResponseEntity<ResourceDetails> addResourceDetails(@RequestBody ResourceDetails resourceDetails) {
        ResourceDetails savedResourceDetails = resourceDetailsService.saveResourceDetails(resourceDetails);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedResourceDetails);
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