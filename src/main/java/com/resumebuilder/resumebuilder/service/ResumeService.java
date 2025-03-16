package com.resumebuilder.resumebuilder.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.resumebuilder.resumebuilder.dto.ResumeRegisterDTO;
import com.resumebuilder.resumebuilder.dto.ResumeResponseDTO;
import com.resumebuilder.resumebuilder.model.Resume;
import com.resumebuilder.resumebuilder.model.User;
import com.resumebuilder.resumebuilder.repository.ResumeRepository;
import com.resumebuilder.resumebuilder.repository.UserRepository;
import com.resumebuilder.resumebuilder.exception.ResourceNotFoundException;
import com.resumebuilder.resumebuilder.exception.UnauthorizedException;
import com.resumebuilder.resumebuilder.mapper.ResumeMapper;


@Service
public class ResumeService {
    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository; 
    private final ResumeMapper resumeMapper;

    @Autowired
    public ResumeService(ResumeRepository resumeRepository, UserRepository userRepository, ResumeMapper resumeMapper) {
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository; 
        this.resumeMapper = resumeMapper;
    }

    @Transactional
    public ResumeResponseDTO createResume(ResumeRegisterDTO resumeDTO, String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        Resume resume = resumeMapper.toEntity(resumeDTO);
        resume.setUser(user);
        
        Resume savedResume = resumeRepository.save(resume);
        return resumeMapper.toResponseDTO(savedResume);
    }
    
    @Transactional(readOnly = true)
    public ResumeResponseDTO getResumeById(Long id, String username) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            
        Resume resume = resumeRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Resume not found with id: " + id));
            
        // Security check - ensure resume belongs to the requesting user
        if (!resume.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("You do not have permission to access this resume");
        }
        
        return resumeMapper.toResponseDTO(resume);
    }
}
