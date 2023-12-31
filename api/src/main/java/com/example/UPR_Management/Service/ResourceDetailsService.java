package com.example.UPR_Management.Service;

import com.example.UPR_Management.Entity.ResourceDetails;
import com.example.UPR_Management.Repo.ResourceDetailsRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ResourceDetailsService {

    private final ResourceDetailsRepository resourceDetailsRepository;

    public ResourceDetailsService(ResourceDetailsRepository resourceDetailsRepository) {
        this.resourceDetailsRepository = resourceDetailsRepository;
    }

    public List<ResourceDetails> getAllResourceDetails() {
        return resourceDetailsRepository.findAll();
    }

    public Optional<ResourceDetails> getResourceDetailsById(Long id) {
        return resourceDetailsRepository.findById(id);
    }

    public ResourceDetails saveResourceDetails(ResourceDetails resourceDetails) {
        resourceDetails.setModifiedDate(new Date());
        if (resourceDetails.getCreationDate()==null ){
            resourceDetails.setCreationDate(new Date());
        };  
        return resourceDetailsRepository.save(resourceDetails);
    }

    public void deleteResourceDetails(Long id) {
        if(resourceDetailsRepository.existsById(id)) {
            resourceDetailsRepository.deleteById(id);
        } else {
            throw new IllegalStateException("ResourceDetails with id " + id + " does not exist");
        }
    }

    public Optional<ResourceDetails> updateResourceDetails(Long id, ResourceDetails updatedDetails) {
        Optional<ResourceDetails> existingResourceOpt = resourceDetailsRepository.findById(id);
        if (!existingResourceOpt.isPresent()) {
            return Optional.empty();
        }
        ResourceDetails existingResource = existingResourceOpt.get();
        existingResource.setResourceCode(updatedDetails.getResourceCode());
        existingResource.setResourceDescription(updatedDetails.getResourceDescription());
        existingResource.setResourceCost(updatedDetails.getResourceCost());
        existingResource.setModifiedDate(new Date());
        ResourceDetails savedResourceDetails = resourceDetailsRepository.save(existingResource);
        
        return Optional.of(savedResourceDetails);
    }

}