package com.example.UPR_Management.Controller;

import com.example.UPR_Management.Entity.Formula;
import com.example.UPR_Management.Service.FormulaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/formulas")
public class FormulaController {

    @Autowired
    private final FormulaService formulaService;

    public FormulaController(FormulaService formulaService) {
        this.formulaService = formulaService;
    }

    @GetMapping
    public ResponseEntity<Iterable<Formula>> getAllFormulas() {
        return ResponseEntity.ok(formulaService.getAllFormulas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Formula> getFormulaById(@PathVariable Long id) {
        return formulaService.getFormulaById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<String> addFormula(@RequestBody Formula formula) {
        formulaService.saveFormula(formula);
        return ResponseEntity.status(HttpStatus.CREATED).body("Formula added successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateFormula(@PathVariable Long id, @RequestBody Formula formula) {
        formulaService.updateFormula(id, formula);
        return ResponseEntity.ok("Formula updated successfully");
    }

    
    @DeleteMapping("/{formulaId}")
    public ResponseEntity<?> deleteFormula(@PathVariable Long formulaId) {
        try {
            formulaService.deleteFormula(formulaId);
            return ResponseEntity.ok("Formula deleted successfully");
        } catch (Exception e) {
            return new ResponseEntity<>("Error deleting formula: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
