package com.example.talent_api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.example.talent_api.dtos.CompleteApplicationDTO;
import com.example.talent_api.entities.Application;

@Repository
public interface CompleteApplicationRepository extends JpaRepository<Application, Long>{


    // @Query("SELECT new com.example.talent_api.dtos.CompleteApplicationDTO(a.applicationId, a.userId, a.jobId, a.dateApplied, a.coverLetter, a.customResume, a.applicationStatus, j.department, j.listing_title, j.job_title, j.job_description) " +
    //        "FROM Application a JOIN job j ON a.jobId = j.job_id WHERE a.userId = :userId")
    // List<CompleteApplicationDTO> findCompleteApplicationsByUserId(@Param("userId") int userId);

}
