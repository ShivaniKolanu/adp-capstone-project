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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.talent_api.entities.Job;
import com.example.talent_api.repositories.JobRepository;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    @GetMapping
    public ResponseEntity<?> getAllJobs() {
        List<Job> jobs = jobRepository.findAll();
        if (jobs.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Jobs found.");
        }
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/{job_id}")
    public ResponseEntity<?> getJobById(@PathVariable Long job_id) {
        Optional<Job> jobOptional = jobRepository.findById(job_id);

        if (jobOptional.isPresent()) {
            Job job = jobOptional.get();
            return ResponseEntity.ok(job);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Job not found with id: " + job_id);
        }
    }

    @GetMapping("/byManagerId/{manager_id}")
    public ResponseEntity<?> getJobByManagerId(@PathVariable Long manager_id) {
        List<Job> jobOptional = jobRepository.findByManagerId(manager_id);

        if (!jobOptional.isEmpty()) {
            // Job job = jobOptional.get();
            return ResponseEntity.ok(jobOptional);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Job not found with manager id: " + manager_id);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchJobsByTitle(@RequestParam String job_title) {
        List<Job> jobs = jobRepository.findByJobTitleContaining(job_title);
        if (jobs.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No jobs found with title containing: " + job_title);
        }
        return ResponseEntity.ok(jobs);
    }

    @PostMapping
    public ResponseEntity<?> addJob(@RequestBody Job job) {
        try {
            if (job.getJobtitle() == null || job.getJobtitle().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Data is missing.");
            }
            Job savedJob = jobRepository.save(job);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedJob);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while saving the job.");
        }
    }

    @PutMapping("/{job_id}")
    public ResponseEntity<?> updateJob(@PathVariable Long job_id, @RequestBody Job updatedJob) {
        Optional<Job> existingJobOptional = jobRepository.findById(job_id);

        if (existingJobOptional.isPresent()) {
            Job existingjob = existingJobOptional.get();

            existingjob.setManagerId(updatedJob.getManagerId());
            existingjob.setDepartment(updatedJob.getDepartment());
            existingjob.setListingTitle(updatedJob.getListingTitle());
            existingjob.setJobtitle(updatedJob.getJobtitle());
            existingjob.setJobdescription(updatedJob.getJobdescription());
            existingjob.setAdditionalinformation(updatedJob.getAdditionalinformation());
            existingjob.setListingstatus(updatedJob.getListingstatus());
            existingjob.setDateClosed(updatedJob.getDateClosed());

            jobRepository.save(existingjob);

            return ResponseEntity.ok(existingjob);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Job not found with id: " + job_id);
        }
    }

    @DeleteMapping("/{job_id}")
    public ResponseEntity<?> deleteJob(@PathVariable Long job_id) {
        Optional<Job> existingJobOptional = jobRepository.findById(job_id);

        if (existingJobOptional.isPresent()) {
            jobRepository.deleteById(job_id);
            return ResponseEntity.ok("Job deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Job not found with id: " + job_id);
        }
    }

}
