package com.example.talent_api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.talent_api.entities.Candidate;
import com.example.talent_api.entities.Login;
import com.example.talent_api.entities.Manager;
import com.example.talent_api.entities.User;
import com.example.talent_api.repositories.CandidateRepository;
import com.example.talent_api.repositories.LoginRepository;
import com.example.talent_api.repositories.ManagerRepository;
import com.example.talent_api.repositories.UserRepository;

import java.util.Optional;

@RestController
@RequestMapping("/api/login")
public class LoginController {

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @GetMapping("/byName/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        Login login = new Login();
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Long user_id = user.getUserId();
            String role = user.getType();

            login.setUsername(user.getUsername());
            login.setPassword(user.getPassword());
            login.setType(user.getType());
            login.setUserId(user.getUserId());

            System.out.println(role);
            if(role.equals("manager")){

                Optional<Manager> managerOptional = managerRepository.findByUserId(user_id);
                if (managerOptional.isPresent()) {
                    Manager manager = managerOptional.get();
                    login.setManagerId(manager.getManagerId()); // Set the managerId in Login entity
                }
            }

            if(role.equals("candidate")){
                Optional<Candidate> candidateOptional = candidateRepository.findByUserId(user_id);
                if (candidateOptional.isPresent()) {
                    Candidate candidate = candidateOptional.get();
                    login.setCandidateId(candidate.getCandidateId()); // Set the managerId in Login entity
                }
            }


            return ResponseEntity.ok(login);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with username: " + username);
        }
    }

}
