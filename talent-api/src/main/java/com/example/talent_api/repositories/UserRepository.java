package com.example.talent_api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.talent_api.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

}
