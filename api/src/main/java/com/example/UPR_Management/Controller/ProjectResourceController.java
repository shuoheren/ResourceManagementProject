// package com.example.UPR_Management.Controller;

// import com.example.UPR_Management.DTO.ResourceDTO;
// import com.example.UPR_Management.Service.ProjectResourceService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import java.util.List;

// @RestController
// @RequestMapping("/projects")
// public class ProjectResourceController {

//     @Autowired
//     private ProjectResourceService projectResourceService;

//     @GetMapping("/{projectId}/resources")
//     public ResponseEntity<List<ResourceDTO>> getResourcesForProject(@PathVariable Long projectId) {
//         List<ResourceDTO> resourceDTOs = projectResourceService.getResourcesForProject(projectId);
//         return ResponseEntity.ok(resourceDTOs);
//     }

//     @GetMapping("/{projectId}/unrelated-resources")
//     public ResponseEntity<List<ResourceDTO>> getUnrelatedResourcesForProject(@PathVariable Long projectId) {
//         List<ResourceDTO> resourceDTOs = projectResourceService.getUnrelatedResourcesForProject(projectId);
//         return ResponseEntity.ok(resourceDTOs);
//     }
// }
