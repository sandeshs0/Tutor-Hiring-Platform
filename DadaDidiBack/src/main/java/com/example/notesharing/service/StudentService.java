package com.example.notesharing.service;

import com.example.notesharing.entity.Student;
import com.example.notesharing.pojo.StudentPojo;

import java.util.List;
import java.util.Optional;

public interface StudentService {
    void saveOrUpdateStudent(StudentPojo studentPojo);

    void updateStudentProfile(Integer studentId, StudentPojo studentPojo);

    List<Student> getAllStudents();

    Optional<Student> getStudentById(Integer id);

    void deleteStudentById(Integer id);

    Optional<Student> getStudentByUserId(Integer userId);
}
