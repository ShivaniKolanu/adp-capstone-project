package com.example.talent_api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.talent_api.entities.Application;


@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
        // Optional<Application> findByManagerId(Long manager_id);
        // @Query("SELECT j FROM Job j WHERE LOWER(j.job_title) LIKE LOWER(CONCAT('%',
        // :job_title, '%'))")

        // List<AppsAndJobs> findApplicationByJobId(Long job_id);
        // @Query("SELECT a FROM Application a JOIN Candidate c ON a.userId = c.user_id WHERE a.jobId = :job_id")
        // List<AppsAndJobs> findApplicationsByJobId(@Param("job_id") Long job_id);
}
