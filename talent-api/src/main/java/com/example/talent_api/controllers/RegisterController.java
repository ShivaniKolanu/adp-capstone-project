package com.example.talent_api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.talent_api.entities.Candidate;
import com.example.talent_api.entities.Manager;
import com.example.talent_api.entities.Register;
import com.example.talent_api.entities.User;
import com.example.talent_api.repositories.CandidateRepository;
import com.example.talent_api.repositories.ManagerRepository;
// import com.example.talent_api.repositories.RegisterRepository;
import com.example.talent_api.repositories.UserRepository;

@RestController
@RequestMapping("/api/registration")
public class RegisterController {

    // @Autowired
    // private RegisterRepository registerRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping

    public ResponseEntity<String> registerUser(@RequestBody Register registering_user) {
        if (registering_user.getRole() == null) {
            return new ResponseEntity<>("Role is required", HttpStatus.BAD_REQUEST);
        }

        User user = new User();

        user.setUsername(registering_user.getUsername());
        user.setPassword(registering_user.getPassword());
        user.setType(registering_user.getRole());
        User savedUser = userRepository.save(user);

        Long userId = savedUser.getUserId();

        switch (registering_user.getRole().toLowerCase()) {
            case "candidate":
                // Handle candidate-specific logic
                Candidate candidate = new Candidate();
                candidate.setFullname(registering_user.getFullname());
                candidate.setEmail(registering_user.getEmail());
                candidate.setAddress(registering_user.getAddress());
                candidate.setPhone(registering_user.getPhone());
                candidate.setResume(registering_user.getResume());
                candidate.setUserId(userId);
                candidateRepository.save(candidate);
                break;
            case "manager":
                // Handle manager-specific logic
                Manager manager = new Manager();
                manager.setFullname(registering_user.getFullname());
                manager.setEmail(registering_user.getEmail());
                manager.setPhone(registering_user.getPhone());
                manager.setDepartment(registering_user.getDepartment());
                manager.setUserId(userId);
                managerRepository.save(manager);
                break;
            default:
                return new ResponseEntity<>("Invalid role", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
    }

}
