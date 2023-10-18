package com.example.UPR_Management.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.UPR_Management.Entity.Resource;

public interface ResourceRepository extends JpaRepository<Resource, Long>{
  
}
