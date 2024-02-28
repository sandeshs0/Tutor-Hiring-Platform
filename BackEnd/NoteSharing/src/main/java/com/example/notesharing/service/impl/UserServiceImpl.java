package com.example.notesharing.service.impl;

import com.example.notesharing.config.PasswordEncoderUtil;
import com.example.notesharing.entity.User;
import com.example.notesharing.pojo.UserPojo;
import com.example.notesharing.repository.UserRepository;
import com.example.notesharing.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public void saveUser(UserPojo userPojo) {
        User user = new User();
        if (userPojo.getId() != null) {
            user = userRepository.findById(userPojo.getId())
                    .orElseThrow(() -> new NoSuchElementException("No Data Found"));
        }

        user.setFullName(userPojo.getFullName());
        user.setSubject(userPojo.getSubject());
        user.setUserName(userPojo.getUserName());
        user.setEmail(userPojo.getEmail());
        user.setPhone(userPojo.getPhone());
        user.setAddress(userPojo.getAddress());
        user.setBio(userPojo.getBio());
        user.setProfilePic(userPojo.getProfilePic());
        user.setMonthlyFee(userPojo.getMonthlyFee());
        user.setYearsOfExp(userPojo.getYearsOfExp());
        user.setPassword(PasswordEncoderUtil.getInstance().encode(userPojo.getPassword()));

        userRepository.save(user);
    }

    @Override
    public List<User> getAllData() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getById(Integer id) {
        return userRepository.findById(id);
    }

    @Override
    public void deleteById(Integer id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<User> getAllUsersSortedByMonthlyFee() {
        return userRepository.findAllByOrderByMonthlyFee();
    }

    @Override
    public List<User> getAllUsersSortedByYearsOfExp() {
        return userRepository.findAllByOrderByYearsOfExp();
    }

    @Override
    public List<User> getAllUsersSortedBySubject() {
        return userRepository.findAllByOrderBySubject();
    }
}
