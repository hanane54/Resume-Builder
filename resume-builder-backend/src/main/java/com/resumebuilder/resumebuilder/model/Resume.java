package com.resumebuilder.resumebuilder.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "resumes")
public class Resume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String summary;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

     // Personal information
     private String fullName;
     private String email;
     private String phone;
     private String address;
     private String linkedin;
     private String website;

         // Resume sections - using @OneToMany relationships
    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Education> education = new ArrayList<>();
    
    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Experience> workExperience = new ArrayList<>();
    
    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Skill> skills = new ArrayList<>();
    
    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Project> projects = new ArrayList<>();


    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
    // Helper methods to manage relationships
    public void addEducation(Education education) {
        this.education.add(education);
        education.setResume(this);
    }
    
    public void removeEducation(Education education) {
        this.education.remove(education);
        education.setResume(null);
    }
    // Helper methods to manage relationships
    public void addWorkExperience(Experience experience) {
        this.workExperience.add(experience);
        experience.setResume(this);
    }
    
    public void removeWorkExperience(Experience experience) {
        this.workExperience.remove(experience);
        experience.setResume(null);
    }
     // Helper methods to manage relationships
     public void addSkill(Skill skill) {
        this.skills.add(skill);
        skill.setResume(this);
    }
    
    public void removeSkill(Skill skill) {
        this.skills.remove(skill);
        skill.setResume(null);
    }

    // Helper methods to manage relationships
    public void addProject(Project project) {
        this.projects.add(project);
        project.setResume(this);
    }
    
    public void removeProject(Project project) {
        this.projects.remove(project);
        project.setResume(null);
    }

}
