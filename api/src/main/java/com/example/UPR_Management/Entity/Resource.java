package com.example.UPR_Management.Entity;
import lombok.*;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "resource_id")
    private Long resourceId;

    @Column(name = "resource_name")
    private String resourceName;

    @ManyToMany(mappedBy = "resources")
    private List<Project> projects = new ArrayList<>();

    @OneToOne(mappedBy = "resource",cascade = CascadeType.ALL)
    private ResourceDetails resourceDetails;

    // Getters, setters, constructors...
    public void setResourceId(Long resourceId) {
        this.resourceId = resourceId;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    public void setResourceDetails(ResourceDetails resourceDetails) {
        this.resourceDetails = resourceDetails;
    }

    public Long getResourceId() {
        return resourceId;
    }

    public String getResourceName() {
        return resourceName;
    }

    public List<Project> getProjects() {
        return projects;
    }

    public ResourceDetails getResourceDetails() {
        return resourceDetails;
    }

    
    
}