package com.example.notesharing.controller;


import com.example.notesharing.entity.User;
import  com.example.notesharing.pojo.UserPojo;
import com.example.notesharing.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/user")
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/save")
    public String saveUser(@Valid @RequestBody UserPojo userPojo){
        userService.saveUser(userPojo);
        return "data created successfully";
    }

    @GetMapping("/getAll")
    public List<User> getAllData(){return userService.getAllData();}

    @GetMapping("/getById/{id}")
    public Optional<User>getDatabyId(@PathVariable("id") Integer id){return userService.getById(id);}

    @DeleteMapping("/deleteById/{id}")
    public  void deleteById(@PathVariable("id") Integer id){userService.deleteById(id);}

    @GetMapping("/sortByMonthlyFee")
    public List<User> sortByMonthlyFee() {
        return userService.getAllUsersSortedByMonthlyFee();
    }

    @GetMapping("/sortByYearsOfExp")
    public List<User> sortByYearsOfExp() {
        return userService.getAllUsersSortedByYearsOfExp();
    }

    @GetMapping("/sortBySubject")
    public List<User> sortBySubject() {
        return userService.getAllUsersSortedBySubject();
    }


}