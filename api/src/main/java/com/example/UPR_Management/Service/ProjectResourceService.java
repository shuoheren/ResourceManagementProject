// package com.example.UPR_Management.Service;

// import com.example.UPR_Management.DTO.ResourceDTO;
// import com.example.UPR_Management.Repo.ResourceRepository; // Assuming you have this repository
// import com.example.UPR_Management.Repo.ProjectResourceRepository; // You may need to create this
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// public class ProjectResourceService {

//     @Autowired
//     private ResourceRepository resourceRepository;

//     @Autowired
//     private ProjectResourceRepository projectResourceRepository;

//     public List<ResourceDTO> getResourcesForProject(Long projectId) {
//         // This method should query the database to fetch resources related to a project.
//         // The exact implementation depends on your database and repository setup.
//         return projectResourceRepository.findResourcesByProjectId(projectId);
//     }

//     public List<ResourceDTO> getUnrelatedResourcesForProject(Long projectId) {
//         // This method should query the database to fetch resources NOT related to a project.
//         return projectResourceRepository.findUnrelatedResourcesByProjectId(projectId);
//     }
// }
