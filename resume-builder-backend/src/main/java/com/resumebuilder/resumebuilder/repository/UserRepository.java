package com.resumebuilder.resumebuilder.repository;

import com.resumebuilder.resumebuilder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // find user by its username
    Optional<User> findByUsername(String username);
    // find user by its email
    Optional<User> findByEmail(String email);
}