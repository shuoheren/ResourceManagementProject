package com.example.UPR_Management.Entity;

import lombok.*;
import javax.persistence.*;
import java.util.*;
import java.util.stream.Collectors;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    public enum Role {
        USER, ADMIN
    }

    @Id
    @Column(name = "user_name")
    @NonNull
    private String userName;

    @Column(name = "password")
    @NonNull
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String email;

    @Column(name = "create_date", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;

    @OneToMany(mappedBy = "user")
    private List<Project> projects = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        this.createDate = new Date();
    }

    public List<Long> getProjectIds() {
      return projects.stream()
              .map(Project::getProjectId)
              .collect(Collectors.toList());
    }
}
