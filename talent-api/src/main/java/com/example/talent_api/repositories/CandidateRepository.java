package com.example.talent_api.repositories;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.talent_api.entities.Candidate;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long>{

    @Query("SELECT m FROM Candidate m WHERE m.user_id = :user_id")
    Optional<Candidate> findByUserId(@Param("user_id") Long user_id);

}
