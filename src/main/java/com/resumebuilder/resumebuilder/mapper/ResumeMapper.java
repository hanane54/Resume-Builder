package com.resumebuilder.resumebuilder.mapper;

import com.resumebuilder.resumebuilder.dto.ResumeRegisterDTO;
import com.resumebuilder.resumebuilder.dto.ResumeResponseDTO;
import com.resumebuilder.resumebuilder.model.Resume;
import org.springframework.stereotype.Component;

@Component
public class ResumeMapper {

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
        // Add other fields as necessary

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
        // Add other fields as necessary

        return resumeResponseDTO;
    }
}
