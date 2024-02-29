package com.example.dadadidi.repository;

import com.example.dadadidi.entity.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TutorRepository extends JpaRepository<Tutor, Integer> {
    Optional<Tutor> findByUserId(Integer userId);
}
