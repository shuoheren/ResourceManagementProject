package com.example.UPR_Management.Service;

import com.example.UPR_Management.DTO.ResourceDTO;
import com.example.UPR_Management.Entity.Resource;
import com.example.UPR_Management.Repo.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResourceService {

    @Autowired
    private final ResourceRepository resourceRepository;

    public ResourceService(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
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
}
