package com.example.notesharing.controller;


import com.example.notesharing.entity.User;
import  com.example.notesharing.pojo.UserPojo;
import com.example.notesharing.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RequestMapping("/user")
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/save")
    public ResponseEntity<String> saveUser(@Valid @ModelAttribute UserPojo userPojo, @RequestParam("profilePic") MultipartFile profilePictureFile) {
        userService.saveUser(userPojo, profilePictureFile);
        return ResponseEntity.status(HttpStatus.CREATED).body("Data created successfully");
    }

    @GetMapping("/getAll")
    public List<User> getAllData(){return userService.getAllData();}

    @GetMapping("/getById/{id}")
    public User getDatabyId(@PathVariable("id") Integer id){return userService.getById(id);}

    @DeleteMapping("/deleteById/{id}")
    public  void deleteById(@PathVariable("id") Integer id){userService.deleteById(id);}

    @GetMapping("/sortByMonthlyFee")
    public List<User> sortByMonthlyFee() {
        return userService.getAllUsersSortedByMonthlyFee();
    }

    @PutMapping("/updateTutor/{email}")
    public User updateUserByOwnerId(@PathVariable String email, @RequestBody User updatedUser) {
        Optional<User> ownerOptional = userService.getByEmail(email);
        if (ownerOptional.isPresent()) {
            User owner = ownerOptional.get();
            int ownerId = owner.getId();

            return userService.updateUser(ownerId, updatedUser);
        } else {
            throw new RuntimeException("Owner not found with email: " + email);
        }
    }


    @GetMapping("/getByUId/{email}")
    public User getId(@PathVariable String email) {

        Optional<User> userId = userService.getByEmail(email);
        if (userId.isPresent()) {
            User user = userId.get();


            int newUser = user.getId();

            return userService.getUserByEmail(email);
        }
        throw new RuntimeException("Owner not found with email:"+email);
    }
    @GetMapping("/sortByYearsOfExp")
    public List<User> sortByYearsOfExp() {
        return userService.getAllUsersSortedByYearsOfExp();
    }

    @GetMapping("/filterBySubject")
    public List<User> filterBySubject(@RequestParam("subject") String subject) {
        return userService.filterTutorsBySubject(subject);
    }


}