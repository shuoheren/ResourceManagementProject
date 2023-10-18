package com.example.UPR_Management.Repo;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.UPR_Management.Entity.User;
public interface UserRepository extends JpaRepository<User, String>{
  
}
