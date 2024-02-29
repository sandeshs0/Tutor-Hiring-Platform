package com.example.dadadidi.service.impl;

import com.example.dadadidi.config.PasswordEncoderUtil;
import com.example.dadadidi.entity.User;
import com.example.dadadidi.pojo.UserPojo;
import com.example.dadadidi.repository.UserRepository;
import com.example.dadadidi.service.UserService;

import com.example.dadadidi.util.ImageToBase64;
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
//            user.setProfilePic(updatedUser.getProfilePic());
            user.setBio(updatedUser.getBio());
            user.setMonthlyFee(updatedUser.getMonthlyFee());
            user.setYearsOfExp(updatedUser.getYearsOfExp());

            return userRepository.save(user);
        }
        return null;
    }

//    @Override
//    public User updatedUser(Integer id, User updatedUser, MultipartFile imageFile) {
//        System.out.println(id);
//        Optional<User> optionalUser = userRepository.findById(id);

//        // Check if the optional contains a value
//        if (optionalUser.isPresent()) {
//            User user = optionalUser.get(); // Extract the Futsal object from Optional
//
//            System.out.println("futsal name is" + user.getFullName());
//
//            user.setFullName(updatedUser.getFullName());
//            user.setAddress(updatedUser.getAddress());
//            user.setMonthlyFee(updatedUser.getMonthlyFee());
//            user.setYearsOfExp(updatedUser.getYearsOfExp());
//            user.setBio(updatedUser.getBio());
//
//
//            System.out.println("in impl" + updatedFutsal.getName());
//            System.out.println("in impl" + updatedFutsal.getPrice());
//
//            // Check if a new image file is provided
//            if (imageFile != null && !imageFile.isEmpty()) {
//                // Save the new image file
//                String filename = saveImage(imageFile);
//                // Set the new image filename to the futsal
//                futsal.setImage(filename);
//                System.out.println("new file name set in impl:" + filename);
//            }
//
//            return futsalRepository.save(futsal);
//        } else {
//            // Handle the case where Futsal with given id is not found
//            throw new EntityNotFoundException("Futsal not found with id: " + id);
//        }
//
//    }
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
        List<User> users = userRepository.findAll();
        users.forEach(user -> user.setProfilePic(imageToBase64.getImageBase64("/Images/" + user.getProfilePic())));
        return users;
    }

    @Override
    public List<User> getAllUsersSortedByYearsOfExp() {
        List<User> users = userRepository.findAllByOrderByYearsOfExp();
        users.forEach(user -> user.setProfilePic(imageToBase64.getImageBase64("/Images/" + user.getProfilePic())));
        return users;

    }

    @Override
    public Optional<User> getByEmail(String email) {
        return userRepository.getUserByEmail(email); // Implement findByEmail in UserRepository
    }

    @Override
    public List<User> filterTutorsBySubject(String subject) {
        List<User> users = userRepository.findAllBySubject(subject);
        users.forEach(user -> user.setProfilePic(imageToBase64.getImageBase64("/Images/" + user.getProfilePic())));
        return users;
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
