package com.example.talent_api;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface ManagersRepository extends JpaRepository<Managers, Long> {

}
