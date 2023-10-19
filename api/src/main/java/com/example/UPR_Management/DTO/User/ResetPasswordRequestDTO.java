package com.example.UPR_Management.DTO.User;

public class ResetPasswordRequestDTO {
  private String username;
  private String email;
  private String newPassword;


  public ResetPasswordRequestDTO() {
  }

  public void setUserName(String userName) {
    this.username = username;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setNewPassword(String newPassword) {
    this.newPassword = newPassword;
  }

  public String getUsername() {
    return username;
  }

  public String getEmail() {
    return email;
  }

  public String getNewPassword() {
    return newPassword;
  }



}