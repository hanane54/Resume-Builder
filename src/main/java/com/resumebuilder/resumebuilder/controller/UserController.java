package com.resumebuilder.resumebuilder.controller;

import com.resumebuilder.resumebuilder.dto.UserLoginDTO;
import com.resumebuilder.resumebuilder.dto.UserRegisterDTO;
import com.resumebuilder.resumebuilder.model.User;
import com.resumebuilder.resumebuilder.security.JwtUtil;
import com.resumebuilder.resumebuilder.service.UserService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService, 
                          AuthenticationManager authenticationManager, 
                          UserDetailsService userDetailsService, 
                          JwtUtil jwtUtil) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
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
                new UsernamePasswordAuthenticationToken(userDTO.getUsername(), userDTO.getPassword())
            );

            // SecurityContextHolder.getContext().setAuthentication(authentication);
            
            // // Generate JWT token - make sure you're using the correct field (username not email)
            // String jwtToken = jwtUtil.generateToken(userDTO.getUsername());
            UserDetails userDetails = userDetailsService.loadUserByUsername(userDTO.getUsername());
            String jwtToken = jwtUtil.generateToken(userDetails.getUsername());

            Map<String, Object> response = new HashMap<>();
            response.put("message", "User signed-in successfully!");
            response.put("token", "Bearer " + jwtToken);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Authentication failed: " + e.getMessage());
            errorResponse.put("status", HttpStatus.UNAUTHORIZED);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }
}