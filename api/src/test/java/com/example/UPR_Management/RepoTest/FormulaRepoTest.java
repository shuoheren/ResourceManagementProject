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
  
  @Test
  void addFormula() {
    ResourceDetails resourceDetails = new ResourceDetails();
    resourceDetails.setResourceName("demo4");
    Formula formula = new Formula();
    formula.setFormulaName("demo3");
    formulaRepository.save(formula);

  }
}
