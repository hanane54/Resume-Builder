package com.resumebuilder.resumebuilder.controller;

import com.resumebuilder.resumebuilder.dto.UserLoginDTO;
import com.resumebuilder.resumebuilder.dto.UserRegisterDTO;
import com.resumebuilder.resumebuilder.model.User;
import com.resumebuilder.resumebuilder.security.JwtUtil;
import com.resumebuilder.resumebuilder.service.UserService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtUtil jwtUtil;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody UserRegisterDTO userDTO) {
        User registeredUser = userService.registerUser(userDTO);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody UserLoginDTO userDTO) {
        try {
            // Make sure you're using the username field correctly here - it seems you're using email instead
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDTO.getEmail(), userDTO.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            
            // Generate JWT token - make sure you're using the correct field (username not email)
            String jwtToken = jwtUtil.generateToken(userDTO.getEmail());
            
            // Return response with token
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User signed-in successfully!");
            response.put("token", "Bearer " + jwtToken);
            response.put("status", HttpStatus.OK);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Authentication failed: " + e.getMessage());
            errorResponse.put("status", HttpStatus.UNAUTHORIZED);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }
}