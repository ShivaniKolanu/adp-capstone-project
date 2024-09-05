package com.example.talent_api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.example.talent_api.dtos.CompleteApplicationDTO;
import com.example.talent_api.repositories.CompleteApplicationRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@RestController
@RequestMapping("/api/completeApplications")
public class CompleteApplicationController {

    @Autowired
    private CompleteApplicationRepository completeApplicationRepository;

@PersistenceContext
    private EntityManager entityManager;

    
    // @GetMapping("/byUserId/{userId}")
    // public ResponseEntity<?> getApplicationsByUserId(@PathVariable int userId){
    //     List<CompleteApplicationDTO> applications = completeApplicationRepository.findCompleteApplicationsByUserId(userId);
    //     if (!applications.isEmpty()) {
    //         return ResponseEntity.ok(applications);
    //     } else {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Application not found with user id: " + userId);
    //     }

    // }

}
