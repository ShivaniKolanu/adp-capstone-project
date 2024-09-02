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

import com.example.talent_api.entities.Candidate;
import com.example.talent_api.repositories.CandidateRepository;

@RestController
@RequestMapping("/api/candidates")
public class CandidateController {

    @Autowired
    private CandidateRepository candidateRepository;

    @GetMapping
    public ResponseEntity<?> getAllCandidates() {
        List<Candidate> candidates = candidateRepository.findAll();
        if(candidates.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No candidates found.");
        }
        return ResponseEntity.ok(candidates);
    }

    @GetMapping("/{candidate_id}")
    public ResponseEntity<?> getCandidateById(@PathVariable Long candidate_id) {
        Optional<Candidate> candidateOptional = candidateRepository.findById(candidate_id);

        if (candidateOptional.isPresent()) {
            Candidate candidate = candidateOptional.get();
            return ResponseEntity.ok(candidate);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Candidate not found with id: " + candidate_id);
        }
    }

    @PostMapping
    public ResponseEntity<?> addCandidate(@RequestBody Candidate candidate) {
        try {
            if (candidate.getFullname() == null || candidate.getFullname().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Data is missing.");
            }
            Candidate savedCandidate = candidateRepository.save(candidate);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedCandidate);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while saving the candidate.");
        }
    }

    @PutMapping("/{candidate_id}")
    public ResponseEntity<?> updateCandidate(@PathVariable Long candidate_id, @RequestBody Candidate updatedCandidate) {
        Optional<Candidate> existingCandidateOptional = candidateRepository.findById(candidate_id);

        if (existingCandidateOptional.isPresent()) {
            Candidate existingCandidate = existingCandidateOptional.get();

            existingCandidate.setFullname(updatedCandidate.getFullname());
            existingCandidate.setEmail(updatedCandidate.getEmail());
            existingCandidate.setAddress(updatedCandidate.getAddress());
            existingCandidate.setPhone(updatedCandidate.getPhone());
            existingCandidate.setResume(updatedCandidate.getResume());
            existingCandidate.setUserId(updatedCandidate.getUserId());




            candidateRepository.save(existingCandidate);

            return ResponseEntity.ok(existingCandidate);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Candidate not found with id: " + candidate_id);
        }
    }

    @DeleteMapping("/{candidate_id}")
    public ResponseEntity<?> deleteCandidate(@PathVariable Long candidate_id) {
        Optional<Candidate> existingCandidateOptional = candidateRepository.findById(candidate_id);
        
        if (existingCandidateOptional.isPresent()) {
            candidateRepository.deleteById(candidate_id);
            return ResponseEntity.ok("Candidate deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Candidate not found with id: " + candidate_id);
        }
    }






}
