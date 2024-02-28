package com.example.notesharing.service.impl;

import com.example.notesharing.entity.Student;
import com.example.notesharing.pojo.StudentPojo;
import com.example.notesharing.repository.StudentRepository;
import com.example.notesharing.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {
    private final StudentRepository studentRepository;

    @Override
    public void saveOrUpdateStudent(StudentPojo studentPojo) {
        Student student = new Student();
        if (studentPojo.getId() != null) {
            student = studentRepository.findById(studentPojo.getId())
                    .orElseThrow(() -> new NoSuchElementException("No Data Found"));
        }

        student.setId(studentPojo.getId());
        student.setName(studentPojo.getName());
        student.setAddress(studentPojo.getAddress());
        student.setProfilePic(studentPojo.getProfilePic());
        student.setCoverPic(studentPojo.getCoverPic());
        student.setEducationalLevel(studentPojo.getEducationalLevel());
        student.setBio(studentPojo.getBio());


        studentRepository.save(student);
    }

    @Override
    public void updateStudentProfile(Integer studentId, StudentPojo studentPojo) {
        // Retrieve the existing student entity by ID
        Student existingStudent = studentRepository.findById(studentId)
                .orElseThrow(() -> new NoSuchElementException("Student not found"));

        // Update student attributes from StudentPojo
        existingStudent.setName(studentPojo.getName());
        existingStudent.setAddress(studentPojo.getAddress());
        existingStudent.setProfilePic(studentPojo.getProfilePic());
        existingStudent.setCoverPic(studentPojo.getCoverPic());
        existingStudent.setEducationalLevel(studentPojo.getEducationalLevel());
        existingStudent.setBio(studentPojo.getBio());

        // Save the updated student entity
        studentRepository.save(existingStudent);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Optional<Student> getStudentById(Integer id) {
        return studentRepository.findById(id);
    }

    @Override
    public void deleteStudentById(Integer id) {
        studentRepository.deleteById(id);
    }

    @Override
    public Optional<Student> getStudentByUserId(Integer userId) {
        return studentRepository.findByUserId(userId);
    }
}
