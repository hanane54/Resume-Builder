package com.resumebuilder.resumebuilder.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResumeResponseDTO {
    private Long id;
    private String title;
    private String summary;
    private String fullName;
    private String email;
    private String phone; 
    private String address;
    private String linkedin;
    private String website;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Education
    private List<EducationDTO> education;
    
    // Experience
    private List<ExperienceDTO> experience;
    
    // Skills
    private List<String> skills;
    
    // Projects
    private List<ProjectDTO> projects;
}
