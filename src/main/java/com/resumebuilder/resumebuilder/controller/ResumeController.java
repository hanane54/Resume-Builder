package com.resumebuilder.resumebuilder.controller;


import org.springframework.web.bind.annotation.*;

import com.resumebuilder.resumebuilder.service.ResumeService;


@RestController
@RequestMapping("/resumes")
public class ResumeController {
     private final ResumeService resumeService;

     public ResumeController(ResumeService resumeService ){
        this.resumeService = resumeService;
     }
     
     

}
