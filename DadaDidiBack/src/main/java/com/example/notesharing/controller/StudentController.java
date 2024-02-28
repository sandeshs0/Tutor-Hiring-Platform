package com.example.notesharing.controller;

import com.example.notesharing.entity.Student;
import com.example.notesharing.pojo.StudentPojo;
import com.example.notesharing.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;

    @PostMapping("/create")
    public ResponseEntity<String> createStudent(@Validated @RequestBody StudentPojo studentPojo) {
        studentService.saveOrUpdateStudent(studentPojo);
        return ResponseEntity.status(HttpStatus.CREATED).body("Student profile created successfully");
    }

    @GetMapping("/all")
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable("id") Integer id) {
        Optional<Student> studentOptional = studentService.getStudentById(id);
        return studentOptional.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudentById(@PathVariable("id") Integer id) {
        studentService.deleteStudentById(id);
        return ResponseEntity.ok("Student profile deleted successfully");
    }
}
