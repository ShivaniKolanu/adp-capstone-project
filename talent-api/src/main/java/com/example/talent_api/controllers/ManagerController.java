package com.example.talent_api.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.talent_api.Manager;
import com.example.talent_api.repositories.ManagerRepository;

@RestController
@RequestMapping("/api/manager")
public class ManagerController {

    @Autowired
    private ManagerRepository managerRepository;

    @GetMapping
    public ResponseEntity<?> getAllManagers() {
        List<Manager> managers = managerRepository.findAll();
        if(managers.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Managers found.");
        }
        return ResponseEntity.ok(managers);
    }

    @GetMapping("/{manager_id}")
    public ResponseEntity<?> getManagerById(@PathVariable Long manager_id) {
        Optional<Manager> managerOptional = managerRepository.findById(manager_id);

        if (managerOptional.isPresent()) {
            Manager manager = managerOptional.get();
            return ResponseEntity.ok(manager);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Manager not found with id: " + manager_id);
        }
    }

    @PostMapping
    public ResponseEntity<?> addManager(@RequestBody Manager manager) {
        try {
            if (manager.getFullname() == null || manager.getFullname().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Data is missing.");
            }
            Manager savedManager = managerRepository.save(manager);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedManager);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while saving the manager.");
        }
    }

    @PutMapping("/{manager_id}")
    public ResponseEntity<?> updateManager(@PathVariable Long manager_id, @RequestBody Manager updatedManager) {
        Optional<Manager> existingManagerOptional = managerRepository.findById(manager_id);

        if (existingManagerOptional.isPresent()) {
            Manager existingManager = existingManagerOptional.get();

            existingManager.setFullname(updatedManager.getFullname());
            existingManager.setEmail(updatedManager.getEmail());
            existingManager.setPhone(updatedManager.getPhone());
            existingManager.setDepartment(updatedManager.getDepartment());
            existingManager.setUserId(updatedManager.getUserId());



            managerRepository.save(existingManager);

            return ResponseEntity.ok(existingManager);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Manager not found with id: " + manager_id);
        }
    }

    @DeleteMapping("/{manager_id}")
    public ResponseEntity<?> deleteManager(@PathVariable Long manager_id) {
        Optional<Manager> existingManagerOptional = managerRepository.findById(manager_id);
        
        if (existingManagerOptional.isPresent()) {
            managerRepository.deleteById(manager_id);
            return ResponseEntity.ok("Manager deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Manager not found with id: " + manager_id);
        }
    }


}
