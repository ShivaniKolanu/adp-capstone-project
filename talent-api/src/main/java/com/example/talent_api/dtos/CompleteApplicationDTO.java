package com.example.talent_api.dtos;

import java.time.LocalDateTime;


public class CompleteApplicationDTO {

    private Long applicationId;
    private int userId;
    private int jobId;
    private LocalDateTime dateApplied;
    private String coverLetter;
    private String customResume;
    private String applicationStatus;
    private String department;
    private String listing_title;
    private String job_title;
    private String job_description;

    public CompleteApplicationDTO(Long applicationId, int userId, int jobId, LocalDateTime dateApplied,
            String coverLetter, String customResume, String applicationStatus,
            String department, String listing_title, String job_title, String job_description) {

        this.applicationId = applicationId;
        this.userId = userId;
        this.jobId = jobId;
        this.dateApplied = dateApplied;
        this.coverLetter = coverLetter;
        this.customResume = customResume;
        this.applicationStatus = applicationStatus;
        this.department = department;
        this.listing_title = listing_title;
        this.job_title = job_title;
        this.job_description = job_description;
    }

    public Long getApplicationId() {
        return applicationId;
    }
    public void setApplicationId(Long applicationId) {
        this.applicationId = applicationId;
    }
    public int getUserId() {
        return userId;
    }
    public void setUserId(int userId) {
        this.userId = userId;
    }
    public int getJobId() {
        return jobId;
    }
    public void setJobId(int jobId) {
        this.jobId = jobId;
    }
    public LocalDateTime getDateApplied() {
        return dateApplied;
    }
    public void setDateApplied(LocalDateTime dateApplied) {
        this.dateApplied = dateApplied;
    }
    public String getCoverLetter() {
        return coverLetter;
    }
    public void setCoverLetter(String coverLetter) {
        this.coverLetter = coverLetter;
    }
    public String getCustomResume() {
        return customResume;
    }
    public void setCustomResume(String customResume) {
        this.customResume = customResume;
    }
    public String getApplicationStatus() {
        return applicationStatus;
    }
    public void setApplicationStatus(String applicationStatus) {
        this.applicationStatus = applicationStatus;
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




}
