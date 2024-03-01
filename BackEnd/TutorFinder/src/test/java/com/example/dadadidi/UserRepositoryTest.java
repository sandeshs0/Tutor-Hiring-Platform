package com.example.dadadidi;

import com.example.dadadidi.entity.User;
import com.example.dadadidi.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    public void setUp() {
        userRepository.deleteAll();
    }

    @Test
    public void saveUserTest() {
        User user = new User();
        user.setFullName("Testing Full Name");
        user.setBio("Bio test");
        user.setUserName("testuser");
        user.setAddress("test address");
        user.setEmail("testemail");

        User savedUser = userRepository.save(user);

        Assertions.assertThat(savedUser.getId()).isNotNull();
    }

//    @Test
//    public void findByEmailTest() {
//        User user = new User();
//        user.setFullName("John Doe");
//        user.setBio("Bio test");
//        user.setUserName("johndoe");
//        user.setAddress("123 Main St");
//        user.setEmail("johndoe@example.com");
//        userRepository.save(user);
//
//        Optional<User> foundUser = userRepository.getUserByEmail("johndoe@example.com");
//
//        Assertions.assertThat(foundUser).isNotNull();
//        Assertions.assertThat(foundUser).isEqualTo("johndoe@example.com");
//    }

    @Test
    public void findByIdTest() {
        User user = new User();
        user.setFullName("Jane Doe");
        user.setBio("Bio test");
        user.setUserName("janedoe");
        user.setAddress("456 Elm St");
        user.setEmail("janedoe@example.com");
        User savedUser = userRepository.save(user);

        Optional<User> foundUserOptional = userRepository.findById(savedUser.getId());

        Assertions.assertThat(foundUserOptional).isPresent();
        Assertions.assertThat(foundUserOptional.get().getId()).isEqualTo(savedUser.getId());
    }

    @Test
    public void deleteByIdTest() {
        User user = new User();
        user.setFullName("Jack Smith");
        user.setBio("Bio test");
        user.setUserName("jacksmith");
        user.setAddress("789 Oak St");
        user.setEmail("jacksmith@example.com");
        User savedUser = userRepository.save(user);

        userRepository.deleteById(savedUser.getId());

        Assertions.assertThat(userRepository.findById(savedUser.getId())).isEmpty();
    }

//    @Test
//    public void findAllTest() {
//        User user1 = new User();
//        user1.setFullName("John Doe");
//        user1.setBio("Bio test");
//        user1.setUserName("johndoe");
//        user1.setAddress("123 Main St");
//        user1.setEmail("johndoe@example.com");
//        userRepository.save(user1);
//
//        User user2 = new User();
//        user2.setFullName("Jane Doe");
//        user2.setBio("Bio test");
//        user2.setUserName("janedoe");
//        user2.setAddress("456 Elm St");
//        user2.setEmail("janedoe@example.com");
//        userRepository.save(user2);
//
//        List<User> users = userRepository.findAll();
//
//        Assertions.assertThat(users.size()).isEqualTo(2);
//    }

    // Add more test cases for other repository methods as needed
}
