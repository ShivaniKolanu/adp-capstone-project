package com.example.talent_api.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;

@Entity
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long job_id;
   
    @Column(name = "manager_id")
    private Long managerId;

    private String department;
    private String listing_title;
    private String job_title;
    private String job_description;
    private String additional_information;
    private String listing_status;

    private LocalDateTime date_listed;
    private LocalDateTime date_closed;

    @PrePersist
    protected void onCreate() {
        this.date_listed = LocalDateTime.now();
    }

    public Long getJobId(){
        return job_id;
    }

    public void setJobId(Long job_id){
        this.job_id = job_id;
    }

    public Long getManagerId() {
        return managerId;
    }

    public void setManagerId(Long managerId) {
        this.managerId = managerId;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getListingTitle() {
        return listing_title;
    }

    public void setListingTitle(String listing_title) {
        this.listing_title = listing_title;
    }

    public String getJobtitle() {
        return job_title;
    }

    public void setJobtitle(String job_title) {
        this.job_title = job_title;
    }

    public String getJobdescription() {
        return job_description;
    }

    public void setJobdescription(String job_description) {
        this.job_description = job_description;
    }


    public String getAdditionalinformation() {
        return additional_information;
    }

    public void setAdditionalinformation(String additional_information) {
        this.additional_information = additional_information;
    }


    public String getListingstatus() {
        return listing_status;
    }

    public void setListingstatus(String listing_status) {
        this.listing_status = listing_status;
    }

    public LocalDateTime getDateListed() {
        return date_listed;
    }

    public LocalDateTime getDateClosed() {
        return date_closed;
    }

    public void setDateClosed(LocalDateTime date_closed) {
        this.date_closed = date_closed;
    }






}
