package com.resumebuilder.resumebuilder.security;

import com.resumebuilder.resumebuilder.model.User;
import com.resumebuilder.resumebuilder.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    private final UserRepository userRepository;
    
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Using email as the username for authentication
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
            
        return new org.springframework.security.core.userdetails.User(
            user.getEmail(), // Using email as the principal
            user.getPassword(),
            Collections.singletonList(new SimpleGrantedAuthority("USER"))
        );
    }
}