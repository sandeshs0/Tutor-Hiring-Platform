package com.example.dadadidi.service.impl;

import com.example.dadadidi.entity.Tutor;
import com.example.dadadidi.pojo.TutorPojo;
import com.example.dadadidi.repository.TutorRepository;
import com.example.dadadidi.service.TutorService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class TutorServiceImpl implements TutorService {
    private final TutorRepository tutorRepository;

    @Override
    public void saveTutor(TutorPojo tutorPojo) {
        Tutor tutor = new Tutor();
        if (tutorPojo.getId() != null) {
            tutor = tutorRepository.findById(tutorPojo.getId())
                    .orElseThrow(() -> new NoSuchElementException("No Data Found"));
        }

        // Set tutor attributes from TutorPojo
        tutor.setName(tutorPojo.getName());
        tutor.setAddress(tutorPojo.getAddress());
        tutor.setProfilePic(tutorPojo.getProfilePic());
        tutor.setCoverPic(tutorPojo.getCoverPic());
        tutor.setHourlyRate(tutorPojo.getHourlyRate());
        tutor.setYearsOfExp(tutorPojo.getYearsOfExp());
        tutor.setSubjects(tutorPojo.getSubjects());

        // Save or update tutor entity
        tutorRepository.save(tutor);
    }

    @Override
    public void updateTutorProfile(Integer tutorId, TutorPojo tutorPojo) {
        // Retrieve the existing tutor entity by ID
        Tutor existingTutor = tutorRepository.findById(tutorId)
                .orElseThrow(() -> new NoSuchElementException("Tutor not found"));

        // Update tutor attributes from TutorPojo
        existingTutor.setName(tutorPojo.getName());
        existingTutor.setAddress(tutorPojo.getAddress());
        existingTutor.setProfilePic(tutorPojo.getProfilePic());
        existingTutor.setCoverPic(tutorPojo.getCoverPic());
        existingTutor.setHourlyRate(tutorPojo.getHourlyRate());
        existingTutor.setYearsOfExp(tutorPojo.getYearsOfExp());
        existingTutor.setSubjects(tutorPojo.getSubjects());

        // Save the updated tutor entity
        tutorRepository.save(existingTutor);
    }

    @Override
    public List<Tutor> getAllTutors() {
        return tutorRepository.findAll();
    }

    @Override
    public Optional<Tutor> getTutorById(Integer tutorId) {
        return tutorRepository.findById(tutorId);
    }

    @Override
    public void deleteTutorById(Integer tutorId) {
        tutorRepository.deleteById(tutorId);
    }
}
