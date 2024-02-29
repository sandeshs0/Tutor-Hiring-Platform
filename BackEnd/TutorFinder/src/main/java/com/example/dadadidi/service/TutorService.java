package com.example.dadadidi.service;

import com.example.dadadidi.entity.Tutor;
import com.example.dadadidi.pojo.TutorPojo;

import java.util.List;
import java.util.Optional;

public interface TutorService {
    void saveTutor(TutorPojo tutorPojo);

    void updateTutorProfile(Integer tutorId, TutorPojo tutorPojo);

    List<Tutor> getAllTutors();

    Optional<Tutor> getTutorById(Integer tutorId);

    void deleteTutorById(Integer tutorId);
}
