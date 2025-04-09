package com.resumebuilder.resumebuilder.service;

import com.resumebuilder.resumebuilder.dto.UserRegisterDTO;
import com.resumebuilder.resumebuilder.model.User;
import com.resumebuilder.resumebuilder.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(UserRegisterDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword())); 
        return userRepository.save(user);
    }
    
    // You'll likely need methods for login functionality
    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
            .orElse(null); // Assuming your repository returns Optional<User>
    }
    
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
            .orElse(null); // Assuming your repository returns Optional<User>
    }
    
    // Additional methods for user management
    public User updateUser(User user) {
        return userRepository.save(user);
    }
    
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
    
    public User getUserById(Long id) {
        return userRepository.findById(id)
            .orElse(null);
    }

    public User getUserProfile(String username) {
        User user = findByUsername(username);
        return user != null && passwordEncoder.matches(password, user.getPassword());
    }
    
    // Method to check if credentials are valid (without using Spring Security)
    public boolean isValidCredentials(String username, String password) {
        User user = findByUsername(username);
        return user != null && passwordEncoder.matches(password, user.getPassword());
    }
}