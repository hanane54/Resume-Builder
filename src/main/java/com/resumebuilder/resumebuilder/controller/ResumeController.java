package com.resumebuilder.resumebuilder.controller;


import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.itextpdf.text.DocumentException;
import com.resumebuilder.resumebuilder.dto.ResumeRegisterDTO;
import com.resumebuilder.resumebuilder.dto.ResumeResponseDTO;
import com.resumebuilder.resumebuilder.model.Resume;
import com.resumebuilder.resumebuilder.service.ResumePdfService;
import com.resumebuilder.resumebuilder.service.ResumeService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;


@RestController
@RequestMapping("/resumes")
public class ResumeController {
    private final ResumeService resumeService;
    private final ResumePdfService resumePDFService;

    public ResumeController(ResumeService resumeService, ResumePdfService resumePdfService ){
        this.resumeService = resumeService;
        this.resumePDFService = resumePdfService;
    }
     
    @PostMapping
    public ResponseEntity<ResumeResponseDTO> createResume(
            @RequestBody ResumeRegisterDTO resumeDTO,
            @AuthenticationPrincipal UserDetails userDetails) {

        if (userDetails == null) {
            throw new IllegalArgumentException("UserDetails is null. Ensure the user is authenticated.");
        }

        ResumeResponseDTO createdResume = resumeService.createResume(resumeDTO, userDetails.getUsername());
        return new ResponseEntity<>(createdResume, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResumeResponseDTO> getResumeById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {

        if (userDetails == null) {
            throw new IllegalArgumentException("UserDetails is null. Ensure the user is authenticated.");
        }
        
        ResumeResponseDTO resume = resumeService.getResumeById(id, userDetails.getUsername());
        return ResponseEntity.ok(resume);
    }

    @GetMapping
    public ResponseEntity<List<ResumeResponseDTO>> getAllUserResumes(
            @AuthenticationPrincipal UserDetails userDetails) {

        if (userDetails == null) {
            throw new IllegalArgumentException("UserDetails is null. Ensure the user is authenticated.");
        }
        
        List<ResumeResponseDTO> resumes = resumeService.getAllUserResumes(userDetails.getUsername());
        return ResponseEntity.ok(resumes);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResumeResponseDTO> updateResume(
            @PathVariable Long id,
            @RequestBody ResumeRegisterDTO resumeDTO,
            @AuthenticationPrincipal UserDetails userDetails) {

        if (userDetails == null) {
            throw new IllegalArgumentException("UserDetails is null. Ensure the user is authenticated.");
        }
        
        ResumeResponseDTO updatedResume = resumeService.updateResume(id, resumeDTO, userDetails.getUsername());
        return ResponseEntity.ok(updatedResume);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResume(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {

        if (userDetails == null) {
            throw new IllegalArgumentException("UserDetails is null. Ensure the user is authenticated.");
        }
        
        resumeService.deleteResume(id, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<byte[]> downloadResume(@PathVariable Long id, HttpServletRequest request) throws IOException, DocumentException {
        String username = request.getUserPrincipal().getName();
    
        // Retrieve the Resume entity instead of the DTO
        Resume resume = resumeService.getResumeEntityById(id, username); 
        
        byte[] pdfBytes = resumePDFService.generateResumePDF(resume);

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=resume.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }
     

}
