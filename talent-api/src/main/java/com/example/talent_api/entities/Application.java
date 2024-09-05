package com.example.talent_api.entities;
import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;

@Entity
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long applicationId;
    private int userId;
    private int jobId;
    private LocalDateTime dateApplied;
    private String coverLetter;
    private String customResume;
    private String applicationStatus;

    @PrePersist
    protected void onCreate() {
        this.dateApplied = LocalDateTime.now();
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
}
