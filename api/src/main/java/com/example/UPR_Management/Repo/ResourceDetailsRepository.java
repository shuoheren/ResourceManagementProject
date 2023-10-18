package com.example.UPR_Management.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.UPR_Management.Entity.ResourceDetails;

public interface ResourceDetailsRepository extends JpaRepository<ResourceDetails, Long>{
  
}
