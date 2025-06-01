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
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
public class ResumeMapper {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private static final int MAX_LENGTH = 255;

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
                // Parse date strings to LocalDateTime
                if (expDTO.getStartDate() != null) {
                    LocalDate startDate = LocalDate.parse(expDTO.getStartDate(), DATE_FORMATTER);
                    experience.setStartDate(startDate.atStartOfDay());
                }
                if (expDTO.getEndDate() != null) {
                    LocalDate endDate = LocalDate.parse(expDTO.getEndDate(), DATE_FORMATTER);
                    experience.setEndDate(endDate.atStartOfDay());
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
                    if (exp.getStartDate() != null) {
                        expDTO.setStartDate(exp.getStartDate().toLocalDate().format(DATE_FORMATTER));
                    }
                    if (exp.getEndDate() != null) {
                        expDTO.setEndDate(exp.getEndDate().toLocalDate().format(DATE_FORMATTER));
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

    private String truncateIfNeeded(String value) {
        if (value != null && value.length() > MAX_LENGTH) {
            return value.substring(0, MAX_LENGTH);
        }
        return value;
    }

    public void updateEntityFromDTO(ResumeRegisterDTO resumeDTO, Resume resume) {
        if (resume == null || resumeDTO == null) {
            return;
        }

        try {
            // Update basic information with length validation
            resume.setTitle(truncateIfNeeded(resumeDTO.getTitle()));
            resume.setSummary(truncateIfNeeded(resumeDTO.getSummary()));
            resume.setFullName(truncateIfNeeded(resumeDTO.getFullName()));
            resume.setEmail(truncateIfNeeded(resumeDTO.getEmail()));
            resume.setPhone(truncateIfNeeded(resumeDTO.getPhone()));
            resume.setAddress(truncateIfNeeded(resumeDTO.getAddress()));
            resume.setLinkedin(truncateIfNeeded(resumeDTO.getLinkedin()));
            resume.setWebsite(truncateIfNeeded(resumeDTO.getWebsite()));

            // Update education
            if (resumeDTO.getEducation() != null) {
                // Update existing education entries or add new ones
                for (int i = 0; i < resumeDTO.getEducation().size(); i++) {
                    EducationDTO eduDTO = resumeDTO.getEducation().get(i);
                    Education education;
                    
                    if (i < resume.getEducation().size()) {
                        // Update existing education
                        education = resume.getEducation().get(i);
                    } else {
                        // Add new education
                        education = new Education();
                        resume.addEducation(education);
                    }

                    education.setInstitution(truncateIfNeeded(eduDTO.getInstitution()));
                    education.setDegree(truncateIfNeeded(eduDTO.getDegree()));
                    education.setFieldOfStudy(truncateIfNeeded(eduDTO.getFieldOfStudy()));
                    try {
                        if (eduDTO.getStartDate() != null) {
                            LocalDate startDate = LocalDate.parse(eduDTO.getStartDate(), DATE_FORMATTER);
                            education.setStartDate(startDate.toString());
                        }
                        if (eduDTO.getEndDate() != null) {
                            LocalDate endDate = LocalDate.parse(eduDTO.getEndDate(), DATE_FORMATTER);
                            education.setEndDate(endDate.toString());
                        }
                    } catch (Exception e) {
                        education.setStartDate(null);
                        education.setEndDate(null);
                    }
                    education.setDescription(truncateIfNeeded(eduDTO.getDescription()));
                }

                // Remove excess education entries
                while (resume.getEducation().size() > resumeDTO.getEducation().size()) {
                    resume.getEducation().remove(resume.getEducation().size() - 1);
                }
            }

            // Update experience
            if (resumeDTO.getExperience() != null) {
                // Update existing experience entries or add new ones
                for (int i = 0; i < resumeDTO.getExperience().size(); i++) {
                    ExperienceDTO expDTO = resumeDTO.getExperience().get(i);
                    Experience experience;
                    
                    if (i < resume.getWorkExperience().size()) {
                        // Update existing experience
                        experience = resume.getWorkExperience().get(i);
                    } else {
                        // Add new experience
                        experience = new Experience();
                        resume.addWorkExperience(experience);
                    }

                    experience.setCompanyName(truncateIfNeeded(expDTO.getCompany()));
                    experience.setPosition(truncateIfNeeded(expDTO.getPosition()));
                    try {
                        if (expDTO.getStartDate() != null) {
                            LocalDate startDate = LocalDate.parse(expDTO.getStartDate(), DATE_FORMATTER);
                            experience.setStartDate(startDate.atStartOfDay());
                        }
                        if (expDTO.getEndDate() != null) {
                            LocalDate endDate = LocalDate.parse(expDTO.getEndDate(), DATE_FORMATTER);
                            experience.setEndDate(endDate.atStartOfDay());
                        }
                    } catch (Exception e) {
                        experience.setStartDate(null);
                        experience.setEndDate(null);
                    }
                    experience.setDescription(truncateIfNeeded(expDTO.getDescription()));
                }

                // Remove excess experience entries
                while (resume.getWorkExperience().size() > resumeDTO.getExperience().size()) {
                    resume.getWorkExperience().remove(resume.getWorkExperience().size() - 1);
                }
            }

            // Update skills
            if (resumeDTO.getSkills() != null) {
                // Update existing skills or add new ones
                for (int i = 0; i < resumeDTO.getSkills().size(); i++) {
                    String skillName = resumeDTO.getSkills().get(i);
                    if (skillName != null && !skillName.trim().isEmpty()) {
                        Skill skill;
                        if (i < resume.getSkills().size()) {
                            // Update existing skill
                            skill = resume.getSkills().get(i);
                            skill.setSkillname(truncateIfNeeded(skillName));
                        } else {
                            // Add new skill
                            skill = new Skill();
                            skill.setSkillname(truncateIfNeeded(skillName));
                            resume.addSkill(skill);
                        }
                    }
                }

                // Remove excess skills
                while (resume.getSkills().size() > resumeDTO.getSkills().size()) {
                    resume.getSkills().remove(resume.getSkills().size() - 1);
                }
            }

            // Update projects
            if (resumeDTO.getProjects() != null) {
                // Update existing projects or add new ones
                for (int i = 0; i < resumeDTO.getProjects().size(); i++) {
                    ProjectDTO projDTO = resumeDTO.getProjects().get(i);
                    if (projDTO != null && projDTO.getName() != null) {
                        Project project;
                        if (i < resume.getProjects().size()) {
                            // Update existing project
                            project = resume.getProjects().get(i);
                        } else {
                            // Add new project
                            project = new Project();
                            resume.addProject(project);
                        }
                        project.setTitle(truncateIfNeeded(projDTO.getName()));
                        project.setDescription(truncateIfNeeded(projDTO.getDescription()));
                        project.setUrl(truncateIfNeeded(projDTO.getLink()));
                    }
                }

                // Remove excess projects
                while (resume.getProjects().size() > resumeDTO.getProjects().size()) {
                    resume.getProjects().remove(resume.getProjects().size() - 1);
                }
            }
        } catch (Exception e) {
            System.err.println("Error updating resume: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to update resume: " + e.getMessage());
        }
    }
}
