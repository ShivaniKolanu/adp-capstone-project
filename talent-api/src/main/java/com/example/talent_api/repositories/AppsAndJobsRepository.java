package com.example.talent_api.repositories;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.talent_api.dtos.AppsAndJobsDTO;
import com.example.talent_api.entities.Application;
import com.example.talent_api.entities.AppsAndJobs;


@Repository
public interface AppsAndJobsRepository extends JpaRepository<AppsAndJobs, Long> {
        // @Query("SELECT a FROM Application a JOIN Candidate c ON a.userId = c.user_id WHERE a.jobId = :jobId")
        // List<AppsAndJobs> findApplicationsByJobId(@Param("jobId") Long jobId);

        @Query("SELECT new com.example.talent_api.dtos.AppsAndJobsDTO(a.applicationId, a.userId, a.jobId, a.dateApplied, a.coverLetter, a.customResume, a.applicationStatus, c.full_name, c.email, c.address, c.phone, c.resume) " +
           "FROM Application a JOIN Candidate c ON a.userId = c.user_id WHERE a.jobId = :jobId")
    List<AppsAndJobsDTO> findApplicationsByJobId(@Param("jobId") Long jobId);
}
