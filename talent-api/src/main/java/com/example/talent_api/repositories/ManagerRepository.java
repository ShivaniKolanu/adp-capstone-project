package com.example.talent_api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.talent_api.entities.Manager;
import java.util.Optional;

@Repository
public interface ManagerRepository extends JpaRepository<Manager, Long>{
    
    @Query("SELECT m FROM Manager m WHERE m.user_id = :user_id")
    Optional<Manager> findByUserId(@Param("user_id") Long user_id);


}
