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
//    @PostMapping("/saveAdmin")
//    public String saveAdminUser(@Valid @RequestBody UserPojo userPojo){
//        userPojo.set_admin(true);
//        userService.saveUser(userPojo);
//        return "admin user create successfully.";
//    }

    @GetMapping("/getAll")
    public List<User> getAllData(){return userService.getAllData();}

    @GetMapping("/getById/{id}")
    public Optional<User>getDatabyId(@PathVariable("id") Integer id){return userService.getById(id);}

    @DeleteMapping("/deleteById/{id}")
    public  void deleteById(@PathVariable("id") Integer id){userService.deleteById(id);}
}
