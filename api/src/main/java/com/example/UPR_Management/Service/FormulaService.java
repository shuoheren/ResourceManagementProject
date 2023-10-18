package com.example.UPR_Management.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.UPR_Management.Entity.Formula;
import com.example.UPR_Management.Repo.FormulaRepository;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;


@Service
public class FormulaService {

    @Autowired
    private final FormulaRepository formulaRepository;

    public FormulaService(FormulaRepository formulaRepository) {
        this.formulaRepository = formulaRepository;
    }

    public List<Formula> getAllFormulas() {
        return formulaRepository.findAll();
    }

    public Formula saveFormula(Formula formula) {
        return formulaRepository.save(formula);
    }

    public Optional<Formula> getFormulaById(Long id) {
        return formulaRepository.findById(id);
    }

    public Formula updateFormula(Long id, Formula formula) {
        if(!formulaRepository.existsById(id)) {
            throw new EntityNotFoundException("Formula with id " + id + " does not exist");
        }
        formula.setId(id);  // Ensure the ID is set for the update
        return formulaRepository.save(formula);
    }

    public void deleteFormula(Long id) {
        if(!formulaRepository.existsById(id)) {
            throw new EntityNotFoundException("Formula with id " + id + " does not exist");
        }
        formulaRepository.deleteById(id);
    }
}
