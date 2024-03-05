package com.example.dadadidi.repository;

import com.example.dadadidi.entity.Booking;
import com.example.dadadidi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    Optional<Booking> findByIdAndUser(Integer bookingId, User user);

    List<Booking> findByUser(User user);
}
