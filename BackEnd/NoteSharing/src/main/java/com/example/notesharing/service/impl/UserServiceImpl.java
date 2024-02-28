package com.example.notesharing.service.impl;

import com.example.notesharing.config.PasswordEncoderUtil;
import com.example.notesharing.entity.User;
import com.example.notesharing.pojo.UserPojo;
import com.example.notesharing.repository.UserRepository;
import com.example.notesharing.service.UserService;

import com.example.notesharing.util.ImageToBase64;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    private final String UPLOAD_DIRECTORY = new StringBuilder()
            .append(System.getProperty("user.dir"))
            .append("/DadaDidiFileServer/Images")
            .toString();

    ImageToBase64 imageToBase64 = new ImageToBase64();

    @Override
    public void saveUser(UserPojo userPojo, MultipartFile profilePictureFile) {
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
        user.setMonthlyFee(userPojo.getMonthlyFee());
        user.setYearsOfExp(userPojo.getYearsOfExp());
        user.setPassword(PasswordEncoderUtil.getInstance().encode(userPojo.getPassword()));

        if (profilePictureFile != null && !profilePictureFile.isEmpty()) {
            String profilePicFilename = saveProfilePicture(profilePictureFile);
            user.setProfilePic(profilePicFilename);
        }

        userRepository.save(user);
    }

    private String saveProfilePicture(MultipartFile profilePictureFile) {
        try {
            String filename = profilePictureFile.getOriginalFilename();
            // Modify the UPLOAD_DIRECTORY path as needed
            String path = UPLOAD_DIRECTORY + "/" + filename;
            File dest = new File(path);
            profilePictureFile.transferTo(dest);
            return filename;
        } catch (IOException e) {
            throw new RuntimeException("Failed to save profile picture: " + e.getMessage());
        }
    }

    @Override
    public User updateUser(Integer id, User updatedUser) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setFullName(updatedUser.getFullName());
            user.setAddress(updatedUser.getAddress());
            user.setSubject(updatedUser.getSubject());
            user.setProfilePic(updatedUser.getProfilePic());
            user.setBio(updatedUser.getBio());
            user.setMonthlyFee(updatedUser.getMonthlyFee());
            user.setYearsOfExp(updatedUser.getYearsOfExp());

            return userRepository.save(user);
        }
        return null;
    }
    @Override
    public List<User> getAllData() {
        List<User> users = userRepository.findAll();
        users.forEach(user -> user.setProfilePic(imageToBase64.getImageBase64("/Images/" + user.getProfilePic())));
        return users;
    }

    @Override
    public User getById(Integer id) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            String imagePath = "/Images/" + user.getProfilePic();
            String base64Image = imageToBase64.getImageBase64(imagePath);
            user.setProfilePic(base64Image);
        }
        return user;
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
    public Optional<User> getByEmail(String email) {
        return userRepository.getUserByEmail(email); // Implement findByEmail in UserRepository
    }

    @Override
    public List<User> filterTutorsBySubject(String subject) {
        return userRepository.findAllBySubject(subject);
    }


    @Override
    public User getUserByEmail(String email) {
        User user = userRepository.getUserByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found for owner ID: " + email));

        String imagePath = "/Images/" + user.getProfilePic();
        String base64Image = imageToBase64.getImageBase64(imagePath);

        // Set the base64 image in the futsal object
        user.setProfilePic(base64Image);

        return user;
    }
}
