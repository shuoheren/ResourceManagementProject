package com.example.UPR_Management.Entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Long projectId;

    @Column(name = "project_name")
    private String projectName;

    @Column(name = "create_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;
    
    @PrePersist
    protected void onCreate() {
        createDate = new Date();
    }

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_name_fk", referencedColumnName = "user_name")
    private User user;

    @JsonIgnore
   @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "ProjectResources",
            joinColumns = @JoinColumn(name = "project_id",referencedColumnName = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "resource_id",referencedColumnName = "resource_id")
    )
    private List<Resource> resources = new ArrayList<>();

    public Long getId() {
        return projectId;
    }

    public void setId(Long id) {
        this.projectId = id;
    }

    public String getName() {
        return projectName;
    }

    public void setName(String name) {
        this.projectName = name;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date date) {
        this.createDate = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    
//}
}