package com.resumebuilder.resumebuilder.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResumeRegisterDTO {
    private String title;
    private String summary;
    private String fullName;
    private String email;
    private String phone; 
    private String address;
    private String linkedin;
    private String website;
    
    // Education
    private List<EducationDTO> education;
    
    // Experience
    private List<ExperienceDTO> experience;
    
    // Skills
    private List<String> skills;
    
    // Projects
    private List<ProjectDTO> projects;
}





