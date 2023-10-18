package com.example.UPR_Management.DTO;
import com.example.UPR_Management.Entity.Project;
import com.example.UPR_Management.Entity.User;

import java.util.Date;

public class ProjectDTO {
    private Long projectId;
    private String projectName;
    private Date createDate;
    private String userName;

    // Getters, setters, and constructors...
    public ProjectDTO() {
    }

    public static Project toEntity(ProjectDTO dto) {
        Project project = new Project();
        project.setProjectId(dto.getProjectId());
        project.setProjectName(dto.getProjectName());
        project.setCreateDate(dto.getCreateDate());
        User user = new User();
        user.setUserName(dto.getUserName());
        project.setUser(user);
        return project;
    }
    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getProjectId() {
        return projectId;
    }

    public String getUserName() {
        return userName;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public String getProjectName() {
        return projectName;
    }

    public static ProjectDTO fromEntity(Project project) {
        ProjectDTO dto = new ProjectDTO();
        dto.setProjectId(project.getProjectId());
        dto.setProjectName(project.getProjectName());
        dto.setCreateDate(project.getCreateDate());
        dto.setUserName(project.getUser().getUserName());
        return dto;
    }
}
