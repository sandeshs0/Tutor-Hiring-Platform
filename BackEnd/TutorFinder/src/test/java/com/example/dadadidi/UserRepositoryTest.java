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


}
