package com.example.dadadidi.controller;

import com.example.dadadidi.entity.Tutor;
import com.example.dadadidi.pojo.TutorPojo;
import com.example.dadadidi.service.TutorService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tutor")
@RequiredArgsConstructor
public class TutorController {
    private final TutorService tutorService;
    @PostMapping("/save")
    public String saveTutor(@Valid @RequestBody TutorPojo tutorPojo) {
        tutorService.saveTutor(tutorPojo);
        return "Tutor profile created successfully";
    }

    @PutMapping("/update/{id}")
    public String updateTutorProfile(@PathVariable("id") Integer id, @Valid @RequestBody TutorPojo tutorPojo) {
        tutorService.updateTutorProfile(id, tutorPojo);
        return "Tutor profile updated successfully";
    }

    @GetMapping("/getAll")
    public List<Tutor> getAllTutors() {
        return tutorService.getAllTutors();
    }

    @GetMapping("/getById/{id}")
    public Optional<Tutor> getTutorById(@PathVariable("id") Integer id) {
        return tutorService.getTutorById(id);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteTutorById(@PathVariable("id") Integer id) {
        tutorService.deleteTutorById(id);
    }
}
