package com.example.talent_api.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;


    private String username;
    private String password;
    private String type;


    public Long getUserId() {
        return user_id;
    }

    public void setUserId(Long user_id) {
        this.user_id = user_id;
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
