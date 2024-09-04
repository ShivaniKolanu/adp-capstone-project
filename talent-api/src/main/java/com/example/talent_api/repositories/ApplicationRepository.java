package com.example.talent_api.repositories;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.talent_api.entities.Application;


@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
        // Optional<Application> findByManagerId(Long manager_id);
        List<Application> findApplicationByUserId(Long job_id);
        List<Application> findApplicationByJobId(Long job_id);
}
