package com.resumebuilder.resumebuilder.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;

import com.resumebuilder.resumebuilder.model.Resume;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
    // Find all resumes belonging to a user
    List<Resume> findByUserId(Long userId);
    
    // Find resume by id and user id (for security)
    Optional<Resume> findByIdAndUserId(Long id, Long userId);
    
    // Search resumes by title or content
    @Query("SELECT r FROM Resume r WHERE r.userId = :userId AND " +
           "(LOWER(r.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(r.summary) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<Resume> searchByUserIdAndTitleOrSummary(@Param("userId") Long userId, 
                                                @Param("searchTerm") String searchTerm);
    
    // Count resumes by user
    Long countByUserId(Long userId);
    
    // Find latest resumes by user
    List<Resume> findTop5ByUserIdOrderByUpdatedAtDesc(Long userId);
}
