package com.example.talent_api.controllers;


import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.talent_api.dtos.AppsAndJobsDTO;
import com.example.talent_api.entities.AppsAndJobs;
import com.example.talent_api.repositories.AppsAndJobsRepository;

@RestController
@RequestMapping("/api/appsNjobs")
public class AppsAndJobsController {

    @Autowired 
    private AppsAndJobsRepository appsAndJobsRepository;

    @GetMapping("/byJobId/{jobId}")
    public ResponseEntity<?> getApplicationsByJobId(@PathVariable Long jobId) {
        List<AppsAndJobsDTO> applicationOptional = appsAndJobsRepository.findApplicationsByJobId(jobId);

        if (!applicationOptional.isEmpty()) {
            return ResponseEntity.ok(applicationOptional);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Application not found with job id: " + jobId);
        }
    }

}
