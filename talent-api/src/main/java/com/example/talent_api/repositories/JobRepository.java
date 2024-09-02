package com.example.talent_api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.talent_api.entities.Job;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    Optional<Job> findByManagerId(Long managerId);

    @Query("SELECT j FROM Job j WHERE LOWER(j.job_title) LIKE LOWER(CONCAT('%', :job_title, '%'))")
    List<Job> findByJobTitleContaining(@Param("job_title") String job_title);

}
