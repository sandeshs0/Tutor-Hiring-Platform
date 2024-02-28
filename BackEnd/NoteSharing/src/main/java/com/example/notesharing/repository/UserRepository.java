package com.example.notesharing.repository;

import com.example.notesharing.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    @Query(value = "Select * from users where email=?1",nativeQuery = true)
    Optional<User> getUserByEmail(String email);

    List<User> findAllByOrderByMonthlyFee();

    Optional<User> findById(Integer userId);

    List<User> findAllByOrderByYearsOfExp();


    List<User> findAllBySubject(String subject);
}