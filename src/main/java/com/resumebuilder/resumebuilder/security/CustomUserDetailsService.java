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
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    
        return new org.springframework.security.core.userdetails.User(
            user.getUsername(), // Use username as the principal
            user.getPassword(),
            Collections.singletonList(new SimpleGrantedAuthority("USER"))
        );
    }
}