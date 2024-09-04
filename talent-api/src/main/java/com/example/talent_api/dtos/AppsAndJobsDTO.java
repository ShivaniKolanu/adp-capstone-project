package com.example.talent_api.dtos;


import java.time.LocalDateTime;

public class AppsAndJobsDTO {
    private Long applicationId;
    private int userId;
    private int jobId;
    private LocalDateTime dateApplied;
    private String coverLetter;
    private String customResume;
    private String applicationStatus;
    private String full_name;
    private String email;
    private String address;
    private String phone;
    private String resume;

    public AppsAndJobsDTO(Long applicationId, int userId, int jobId, LocalDateTime dateApplied, 
                          String coverLetter, String customResume, String applicationStatus,
                          String full_name, String email, String address, String phone, String resume) {
        this.applicationId = applicationId;
        this.userId = userId;
        this.jobId = jobId;
        this.dateApplied = dateApplied;
        this.coverLetter = coverLetter;
        this.customResume = customResume;
        this.applicationStatus = applicationStatus;
        this.full_name = full_name;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.resume = resume;
    }

    // Getters and setters
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

    public String getFullname() {
        return full_name;
    }

    public void setFullname(String full_name) {
        this.full_name = full_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getResume() {
        return resume;
    }

    public void setResume(String resume) {
        this.resume = resume;
    }


}

