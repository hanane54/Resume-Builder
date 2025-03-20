package com.resumebuilder.resumebuilder.service;

import java.util.List;
import java.util.stream.Collectors;

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

    public ResumeService(ResumeRepository resumeRepository, UserRepository userRepository, ResumeMapper resumeMapper) {
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository; 
        this.resumeMapper = resumeMapper;
    }

    @Transactional
    public ResumeResponseDTO createResume(ResumeRegisterDTO resumeDTO, String username) {
        User user = userRepository.findByUsername(username)
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

    @Transactional(readOnly = true)
    public List<ResumeResponseDTO> getAllUserResumes(String username) {
        
        User user = userRepository.findByUsername(username).orElseThrow( () -> new ResourceNotFoundException("User not found") );
        
        List<Resume> resumes = resumeRepository.findByUserId(user.getId());

        return resumes.stream().map( resumeMapper::toResponseDTO ).collect( Collectors.toList() );
    }

    @Transactional
    public ResumeResponseDTO updateResume(Long id, ResumeRegisterDTO resumeDTO, String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        Resume resume = resumeRepository.findById(id).orElseThrow( () -> new ResourceNotFoundException("No resume found with id: ", id) );

        // Check if the current user is the resume owner
        if (!resume.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("You do not have permission to update this resume");
        }
        
        // Update resume properties
        resumeMapper.updateEntityFromDTO(resumeDTO, resume);
        
        Resume updatedResume = resumeRepository.save(resume);
        return resumeMapper.toResponseDTO(updatedResume);
    }

    @Transactional
    public void deleteResume(Long id, String username) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            
        Resume resume = resumeRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Resume not found with id: " + id));
            
        // Security check
        if (!resume.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("You do not have permission to delete this resume");
        }
        
        resumeRepository.delete(resume);
    }



}
