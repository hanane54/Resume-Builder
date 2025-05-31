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

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
class EducationDTO {
    private String institution;
    private String degree;
    private String fieldOfStudy;
    private String startDate;
    private String endDate;
    private String description;
}

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
class ExperienceDTO {
    private String company;
    private String position;
    private String startDate;
    private String endDate;
    private String description;
}

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
class ProjectDTO {
    private String name;
    private String description;
    private String technologies;
    private String link;
}
