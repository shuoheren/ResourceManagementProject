package com.example.UPR_Management.DTO;

import com.example.UPR_Management.Entity.User.Role;
import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.NonNull;


public class UserDTO {
    public UserDTO(@NonNull String userName2, @NonNull String password2, Role role2, String email2, Date createDate2,
      List<Long> projectIds2) {
  }
    private String userName;
    private String password;
    private Role role;
    private String email;
    private Date createDate;
    // Note: projects are represented just by their IDs
    private List<Long> projectIds;
    // Getters, setters, constructors...
  public UserDTO(){
    
  }
    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }

    public Role getRole() {
        return role;
    }

    public String getEmail() {
        return email;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public List<Long> getProjectIds() {
        return projectIds;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public void setProjectIds(List<Long> projectIds) {
        this.projectIds = projectIds;
    }


}
