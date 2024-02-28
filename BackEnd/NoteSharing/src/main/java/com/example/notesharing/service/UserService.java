package com.example.notesharing.service;

import com.example.notesharing.entity.User;
import com.example.notesharing.pojo.UserPojo;
import java.util.List;
import java.util.Optional;


public interface UserService {
    void saveUser(UserPojo userPojo);

    List<User> getAllData();

    Optional<User> getById(Integer id);

    void deleteById(Integer id);

    List<User> getAllUsersSortedByMonthlyFee();
    List<User> getAllUsersSortedByYearsOfExp();
    List<User> getAllUsersSortedBySubject();

}