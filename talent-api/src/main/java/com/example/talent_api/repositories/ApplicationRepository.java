package com.example.talent_api.repositories;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.talent_api.entities.Application;

public interface ApplicationRepository extends JpaRepository<Application, Long>{
        // Optional<Application> findByManagerId(Long manager_id);
        Optional<Application> findApplicationByJobId(Long jobId);
}
