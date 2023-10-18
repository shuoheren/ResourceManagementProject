package com.example.UPR_Management.RepoTest;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.UPR_Management.Entity.Formula;
import com.example.UPR_Management.Entity.ResourceDetails;
import com.example.UPR_Management.Repo.FormulaRepository;

@SpringBootTest
public class FormulaRepoTest {
  @Autowired
  FormulaRepository formulaRepository;
  
}
