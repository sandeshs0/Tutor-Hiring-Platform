package com.example.dadadidi.service.impl;

import com.example.dadadidi.entity.Booking;
import com.example.dadadidi.entity.Role;
import com.example.dadadidi.entity.User;
import com.example.dadadidi.pojo.BookingPojo;
import com.example.dadadidi.repository.BookingRepository;
import com.example.dadadidi.service.BookingService;
import com.example.dadadidi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserService userService;

    @Override
    public Booking requestBooking(BookingPojo bookingPojo) {
        Booking booking = new Booking();
        booking.setStudent_name(bookingPojo.getStudentName());
        booking.setTime(bookingPojo.getTime());
        booking.setGrade(bookingPojo.getGrade());
        booking.setTutorEmail(bookingPojo.getTutorEmail());
        booking.setRequirements(bookingPojo.getRequirements());
        booking.setLocation(bookingPojo.getLocation());
        booking.setStudentEmail(bookingPojo.getStudentEmail());
        booking.setOfferedFee(bookingPojo.getOfferedFee());
        User user = new User();
        user.setId(bookingPojo.getUserId());
        Role tutorRole = new Role();
        tutorRole.setName("tutor");

        // Create a collection to hold the roles
        Collection<Role> roles = new ArrayList<>();
        roles.add(tutorRole);

        // Set the roles for the user
        user.setRoles(roles);

        booking.setUser(user);

        // Save the booking to the database
        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getBookingsForLoggedInUser() {
        // Implement logic to retrieve bookings for the logged-in user (tutor)
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();
        Optional<User> userOptional = userService.getByEmail(currentUserEmail);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return bookingRepository.findByUser(user);
        } else {
            throw new RuntimeException("User not found with email: " + currentUserEmail);
        }
    }

    @Override
    public void acceptBooking(Integer bookingId) {
        // Implement logic to accept the booking with the given bookingId
        // This method can only be called by authenticated users (tutors)
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();
        Optional<User> userOptional = userService.getByEmail(currentUserEmail);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Optional<Booking> bookingOptional = bookingRepository.findByIdAndUser(bookingId, user);
            if (bookingOptional.isPresent()) {
                Booking booking = bookingOptional.get();
                // Set booking as accepted
                booking.setAccepted(true);
                bookingRepository.save(booking);
            } else {
                throw new RuntimeException("Booking not found or not owned by the current user");
            }
        } else {
            throw new RuntimeException("User not found with email: " + currentUserEmail);
        }
    }

    @Override
    public void deleteBooking(Integer bookingId) {
        // Implement logic to delete the booking with the given bookingId
        // This method can only be called by authenticated users (tutors)
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();
        Optional<User> userOptional = userService.getByEmail(currentUserEmail);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Optional<Booking> bookingOptional = bookingRepository.findByIdAndUser(bookingId, user);
            if (bookingOptional.isPresent()) {
                bookingRepository.delete(bookingOptional.get());
            } else {
                throw new RuntimeException("Booking not found or not owned by the current user");
            }
        } else {
            throw new RuntimeException("User not found with email: " + currentUserEmail);
        }
    }
}