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
import com.example.talent_api.entities.Application;
import com.example.talent_api.entities.AppsAndJobs;
import com.example.talent_api.repositories.ApplicationRepository;
import com.example.talent_api.repositories.AppsAndJobsRepository;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {
    @Autowired
    private ApplicationRepository ApplicationRepository;

    @Autowired 
    private AppsAndJobsRepository appsAndJobsRepository;

    @GetMapping
    public ResponseEntity<?> getAllApplications() {
        List<Application> application = ApplicationRepository.findAll();
        if(application.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No applications found.");
        }
        return ResponseEntity.ok(application);
    }

    @GetMapping("/{application_id}")
    public ResponseEntity<?> getApplicationById(@PathVariable Long application_id) {
        Optional<Application> applicationOptional = ApplicationRepository.findById(application_id);

        if (applicationOptional.isPresent()) {
            Application application = applicationOptional.get();
            return ResponseEntity.ok(application);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Application not found with id: " + application_id);
        }
    }

    // @GetMapping("/{manager_id}")
    // public ResponseEntity<?> getApplicationByManagerId(@PathVariable Long manager_id) {
    //     Optional<Application> applicationOptional = ApplicationRepository.findByManagerId(manager_id);

    //     if (applicationOptional.isPresent()) {
    //         Application application = applicationOptional.get();
    //         return ResponseEntity.ok(application);
    //     } else {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Application not found with manager id: " + manager_id);
    //     }
    // }
    
    // @GetMapping("/byJobId/{jobId}")
    // public ResponseEntity<?> getApplicationsByJobId(@PathVariable Long jobId) {
    //     List<AppsAndJobs> applicationOptional = appsAndJobsRepository.findApplicationsByJobId(jobId);

    //     if (!applicationOptional.isEmpty()) {
    //         return ResponseEntity.ok(applicationOptional);
    //     } else {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Application not found with job id: " + jobId);
    //     }
    // }

    @PostMapping
    public ResponseEntity<?> addApplication(@RequestBody Application application) {
        try {
            Application savedApplication = ApplicationRepository.save(application);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedApplication);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while saving the application.");
        }
    }

    @PutMapping("/{application_id}")
    public ResponseEntity<?> updateApplication(@PathVariable Long application_id, @RequestBody Application updatedApplication) {
        Optional<Application> existingApplicationOptional = ApplicationRepository.findById(application_id);

        if (existingApplicationOptional.isPresent()) {
            Application existingApplication = existingApplicationOptional.get();

            existingApplication.setUserId(updatedApplication.getUserId());
            existingApplication.setJobId(updatedApplication.getJobId());
            existingApplication.setDateApplied(updatedApplication.getDateApplied());
            existingApplication.setCoverLetter(updatedApplication.getCoverLetter());
            existingApplication.setCustomResume(updatedApplication.getCustomResume());
            existingApplication.setApplicationStatus(updatedApplication.getApplicationStatus());

            ApplicationRepository.save(existingApplication);

            return ResponseEntity.ok(existingApplication);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Application not found with id: " + application_id);
        }
    }

    @DeleteMapping("/{application_id}")
    public ResponseEntity<?> deleteApplication(@PathVariable Long application_id) {
        Optional<Application> existingApplicaOptional = ApplicationRepository.findById(application_id);

        if (existingApplicaOptional.isPresent()) {
            ApplicationRepository.deleteById(application_id);
            return ResponseEntity.ok("Application deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Application not found with id: " + application_id);
        }
    }
}
