package com.example.talent_api.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Login {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

    private Long manager_id;
    private Long candidate_id;
    private String username;
    private String password;
    private String type;

    public Long getUserId() {
        return user_id;
    }

    public void setUserId(Long user_id) {
        this.user_id = user_id;
    }

    public Long getCandidateId() {
        return candidate_id;
    }

    public void setCandidateId(Long candidate_id) {
        this.candidate_id = candidate_id;
    }

    public Long getManagerId() {
        return manager_id;
    }

    public void setManagerId(Long manager_id) {
        this.manager_id = manager_id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public String getPassword(){
        return password;
    }

    public void setPassword(String password){

        this.password = password;

    }


    public String getType(){
        return type;
    }

    public void setType(String type){
        this.type = type;
    }
    





    





}
