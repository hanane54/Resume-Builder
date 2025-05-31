package com.resumebuilder.resumebuilder.mapper;

import com.resumebuilder.resumebuilder.dto.ResumeRegisterDTO;
import com.resumebuilder.resumebuilder.dto.ResumeResponseDTO;
import com.resumebuilder.resumebuilder.dto.EducationDTO;
import com.resumebuilder.resumebuilder.dto.ExperienceDTO;
import com.resumebuilder.resumebuilder.dto.ProjectDTO;
import com.resumebuilder.resumebuilder.model.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Component;
import java.util.stream.Collectors;

@Component
public class ResumeMapper {

    ResumeMapper(AuthenticationManager authenticationManager) {}

    // Method to map ResumeRegisterDTO to Resume entity
    public Resume toEntity(ResumeRegisterDTO resumeDTO) {
        if (resumeDTO == null) {
            return null;
        }

        Resume resume = new Resume();
        resume.setTitle(resumeDTO.getTitle());
        resume.setSummary(resumeDTO.getSummary());
        resume.setFullName(resumeDTO.getFullName());
        resume.setEmail(resumeDTO.getEmail());
        resume.setPhone(resumeDTO.getPhone());
        resume.setAddress(resumeDTO.getAddress());
        resume.setLinkedin(resumeDTO.getLinkedin());
        resume.setWebsite(resumeDTO.getWebsite());

        // Map education
        if (resumeDTO.getEducation() != null) {
            resumeDTO.getEducation().forEach(eduDTO -> {
                Education education = new Education();
                education.setInstitution(eduDTO.getInstitution());
                education.setDegree(eduDTO.getDegree());
                education.setFieldOfStudy(eduDTO.getFieldOfStudy());
                education.setStartDate(eduDTO.getStartDate());
                education.setEndDate(eduDTO.getEndDate());
                education.setDescription(eduDTO.getDescription());
                resume.addEducation(education);
            });
        }

        // Map experience
        if (resumeDTO.getExperience() != null) {
            resumeDTO.getExperience().forEach(expDTO -> {
                Experience experience = new Experience();
                experience.setCompanyName(expDTO.getCompany());
                experience.setPosition(expDTO.getPosition());
                experience.setStartDate(java.time.LocalDateTime.parse(expDTO.getStartDate()));
                if (expDTO.getEndDate() != null) {
                    experience.setEndDate(java.time.LocalDateTime.parse(expDTO.getEndDate()));
                }
                experience.setDescription(expDTO.getDescription());
                resume.addWorkExperience(experience);
            });
        }

        // Map skills
        if (resumeDTO.getSkills() != null) {
            resumeDTO.getSkills().forEach(skillName -> {
                Skill skill = new Skill();
                skill.setSkillname(skillName);
                resume.addSkill(skill);
            });
        }

        // Map projects
        if (resumeDTO.getProjects() != null) {
            resumeDTO.getProjects().forEach(projDTO -> {
                Project project = new Project();
                project.setTitle(projDTO.getName());
                project.setDescription(projDTO.getDescription());
                project.setUrl(projDTO.getLink());
                resume.addProject(project);
            });
        }

        return resume;
    }

    // Method to map Resume entity to ResumeResponseDTO
    public ResumeResponseDTO toResponseDTO(Resume resume) {
        if (resume == null) {
            return null;
        }

        ResumeResponseDTO resumeResponseDTO = new ResumeResponseDTO();
        resumeResponseDTO.setId(resume.getId());
        resumeResponseDTO.setTitle(resume.getTitle());
        resumeResponseDTO.setSummary(resume.getSummary());
        resumeResponseDTO.setFullName(resume.getFullName());
        resumeResponseDTO.setEmail(resume.getEmail());
        resumeResponseDTO.setPhone(resume.getPhone());
        resumeResponseDTO.setAddress(resume.getAddress());
        resumeResponseDTO.setLinkedin(resume.getLinkedin());
        resumeResponseDTO.setWebsite(resume.getWebsite());
        resumeResponseDTO.setCreatedAt(resume.getCreatedAt());
        resumeResponseDTO.setUpdatedAt(resume.getUpdatedAt());

        // Map education
        if (resume.getEducation() != null) {
            resumeResponseDTO.setEducation(resume.getEducation().stream()
                .map(edu -> {
                    EducationDTO eduDTO = new EducationDTO();
                    eduDTO.setInstitution(edu.getInstitution());
                    eduDTO.setDegree(edu.getDegree());
                    eduDTO.setFieldOfStudy(edu.getFieldOfStudy());
                    eduDTO.setStartDate(edu.getStartDate());
                    eduDTO.setEndDate(edu.getEndDate());
                    eduDTO.setDescription(edu.getDescription());
                    return eduDTO;
                })
                .collect(Collectors.toList()));
        }

        // Map experience
        if (resume.getWorkExperience() != null) {
            resumeResponseDTO.setExperience(resume.getWorkExperience().stream()
                .map(exp -> {
                    ExperienceDTO expDTO = new ExperienceDTO();
                    expDTO.setCompany(exp.getCompanyName());
                    expDTO.setPosition(exp.getPosition());
                    expDTO.setStartDate(exp.getStartDate().toString());
                    if (exp.getEndDate() != null) {
                        expDTO.setEndDate(exp.getEndDate().toString());
                    }
                    expDTO.setDescription(exp.getDescription());
                    return expDTO;
                })
                .collect(Collectors.toList()));
        }

        // Map skills
        if (resume.getSkills() != null) {
            resumeResponseDTO.setSkills(resume.getSkills().stream()
                .map(Skill::getSkillname)
                .collect(Collectors.toList()));
        }

        // Map projects
        if (resume.getProjects() != null) {
            resumeResponseDTO.setProjects(resume.getProjects().stream()
                .map(proj -> {
                    ProjectDTO projDTO = new ProjectDTO();
                    projDTO.setName(proj.getTitle());
                    projDTO.setDescription(proj.getDescription());
                    projDTO.setLink(proj.getUrl());
                    return projDTO;
                })
                .collect(Collectors.toList()));
        }

        return resumeResponseDTO;
    }

    public void updateEntityFromDTO(ResumeRegisterDTO resumeDTO, Resume resume) {
        if (resume == null || resumeDTO == null) {
            return;
        }

        resume.setTitle(resumeDTO.getTitle());
        resume.setSummary(resumeDTO.getSummary());
        resume.setFullName(resumeDTO.getFullName());
        resume.setEmail(resumeDTO.getEmail());
        resume.setPhone(resumeDTO.getPhone());
        resume.setAddress(resumeDTO.getAddress());
        resume.setLinkedin(resumeDTO.getLinkedin());
        resume.setWebsite(resumeDTO.getWebsite());

        // Clear existing collections
        resume.getEducation().clear();
        resume.getWorkExperience().clear();
        resume.getSkills().clear();
        resume.getProjects().clear();

        // Map education
        if (resumeDTO.getEducation() != null) {
            resumeDTO.getEducation().forEach(eduDTO -> {
                Education education = new Education();
                education.setInstitution(eduDTO.getInstitution());
                education.setDegree(eduDTO.getDegree());
                education.setFieldOfStudy(eduDTO.getFieldOfStudy());
                education.setStartDate(eduDTO.getStartDate());
                education.setEndDate(eduDTO.getEndDate());
                education.setDescription(eduDTO.getDescription());
                resume.addEducation(education);
            });
        }

        // Map experience
        if (resumeDTO.getExperience() != null) {
            resumeDTO.getExperience().forEach(expDTO -> {
                Experience experience = new Experience();
                experience.setCompanyName(expDTO.getCompany());
                experience.setPosition(expDTO.getPosition());
                experience.setStartDate(java.time.LocalDateTime.parse(expDTO.getStartDate()));
                if (expDTO.getEndDate() != null) {
                    experience.setEndDate(java.time.LocalDateTime.parse(expDTO.getEndDate()));
                }
                experience.setDescription(expDTO.getDescription());
                resume.addWorkExperience(experience);
            });
        }

        // Map skills
        if (resumeDTO.getSkills() != null) {
            resumeDTO.getSkills().forEach(skillName -> {
                Skill skill = new Skill();
                skill.setSkillname(skillName);
                resume.addSkill(skill);
            });
        }

        // Map projects
        if (resumeDTO.getProjects() != null) {
            resumeDTO.getProjects().forEach(projDTO -> {
                Project project = new Project();
                project.setTitle(projDTO.getName());
                project.setDescription(projDTO.getDescription());
                project.setUrl(projDTO.getLink());
                resume.addProject(project);
            });
        }
    }
}
