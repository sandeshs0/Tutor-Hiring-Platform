package com.example.dadadidi.service.impl;

import com.example.dadadidi.entity.Booking;
import com.example.dadadidi.entity.Role;
import com.example.dadadidi.entity.User;
import com.example.dadadidi.pojo.BookingPojo;
import com.example.dadadidi.repository.BookingRepository;
import com.example.dadadidi.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@DataJpaTest
class BookingServiceImplTest {

    @Mock
    private BookingRepository bookingRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private BookingServiceImpl bookingService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void requestBooking() {
        BookingPojo bookingPojo = new BookingPojo();
        // Set up bookingPojo with necessary data

        // Mock user
        User user = new User();
        user.setId(1); // Set user ID
        Role tutorRole = new Role();
        tutorRole.setName("tutor");

        // Create a collection to hold the roles
        Collection<Role> roles = new ArrayList<>();
        roles.add(tutorRole);

        // Set the roles for the user
        user.setRoles(roles);

        when(userService.getByEmail(anyString())).thenReturn(Optional.of(user));
        when(bookingRepository.save(any())).thenReturn(new Booking()); // Mock saving of booking

        Booking savedBooking = bookingService.requestBooking(bookingPojo);

        assertNotNull(savedBooking);
        // Add more assertions as needed
    }

    @Test
    void getBookingsForLoggedInUser() {
        // Mock authentication
        Authentication authentication = new UsernamePasswordAuthenticationToken("tutor@example.com", "password");
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Mock user
        User user = new User();
        user.setEmail("tutor@example.com");

        when(userService.getByEmail(anyString())).thenReturn(Optional.of(user));
        when(bookingRepository.findByUser(any())).thenReturn(new ArrayList<>()); // Mock empty list of bookings

        List<Booking> bookings = bookingService.getBookingsForLoggedInUser();

        assertNotNull(bookings);
        assertEquals(0, bookings.size());
        // Add more assertions as needed
    }

    @Test
    void acceptBooking() {
        // Mock authentication
        Authentication authentication = new UsernamePasswordAuthenticationToken("tutor@example.com", "password");
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Mock user
        User user = new User();
        user.setEmail("tutor@example.com");

        // Mock booking
        Booking booking = new Booking();
        booking.setId(1); // Set booking ID

        when(userService.getByEmail(anyString())).thenReturn(Optional.of(user));
        when(bookingRepository.findByIdAndUser(anyInt(), any())).thenReturn(Optional.of(booking));

        bookingService.acceptBooking(1);

        assertTrue(booking.isAccepted());
        // Add more assertions as needed
    }

    @Test
    void deleteBooking() {
        // Mock authentication
        Authentication authentication = new UsernamePasswordAuthenticationToken("tutor@example.com", "password");
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Mock user
        User user = new User();
        user.setEmail("tutor@example.com");

        // Mock booking
        Booking booking = new Booking();
        booking.setId(1); // Set booking ID

        when(userService.getByEmail(anyString())).thenReturn(Optional.of(user));
        when(bookingRepository.findByIdAndUser(anyInt(), any())).thenReturn(Optional.of(booking));

        bookingService.deleteBooking(1);

        // Verify that delete method is called with the correct booking
        verify(bookingRepository, times(1)).delete(booking);
        // Add more assertions as needed
    }
}
