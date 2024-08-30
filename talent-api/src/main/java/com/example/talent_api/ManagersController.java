package com.example.talent_api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;


@RestController
@RequestMapping("/api/managers")
public class ManagersController {

    @Autowired
    private ManagersRepository managersRepository;


    // Get all managers
    @GetMapping
    public List<Managers> getAllManagers() {
        return managersRepository.findAll();
    }

    // Add a new manager

    @PostMapping("/post")
    public Managers addManager(@RequestBody Managers managers) {
        return managersRepository.save(managers);
        // return "Received";  
    }   


}
