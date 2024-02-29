package com.example.dadadidi.service;

import com.example.dadadidi.entity.User;
import com.example.dadadidi.pojo.UserPojo;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;


public interface UserService {

    void saveUser(UserPojo userPojo, MultipartFile profilePictureFile);

    User updateUser(Integer id, User updatedUser);

    List<User> getAllData();

    User getById(Integer id);

    void deleteById(Integer id);

    List<User> getAllUsersSortedByMonthlyFee();
    List<User> getAllUsersSortedByYearsOfExp();

    Optional<User> getByEmail(String email);

    List<User> filterTutorsBySubject(String subject);


    User getUserByEmail(String email);
}