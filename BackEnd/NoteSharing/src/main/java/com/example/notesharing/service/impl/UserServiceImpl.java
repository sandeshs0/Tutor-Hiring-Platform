package com.example.notesharing.service.impl;


import com.example.notesharing.config.PasswordEncoderUtil;
import com.example.notesharing.entity.User;
import com.example.notesharing.pojo.UserPojo;
import com.example.notesharing.service.UserService;
import com.example.notesharing.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements  UserService{
    private final UserRepository userRepository;
    @Override
    public void saveUser(UserPojo userPojo){
        User user = new User();
        if(userPojo.getId()!=null){
            user=userRepository.findById(Math.toIntExact(Long.valueOf(userPojo.getId())))
                    .orElseThrow(()->new NoSuchElementException("No Data Found"));
        }

        user.setFirstName(userPojo.getFirstName());
        user.setLastName(userPojo.getLastName());
        user.setUserName(userPojo.getUserName());
        user.setEmail(userPojo.getEmail());
        user.setPhone(userPojo.getPhone());
        user.setPassword(PasswordEncoderUtil.getInstance().encode(userPojo.getPassword()));

        userRepository.save(user);
     }
     @Override
    public List<User> getAllData(){return userRepository.findAll();}

    @Override
    public  Optional<User>getById(Integer id){return userRepository.findById(Math.toIntExact(Long.valueOf(id)));}

    @Override
    public void deleteById(Integer id){userRepository.deleteById(Math.toIntExact(Long.valueOf(id)));}
}
