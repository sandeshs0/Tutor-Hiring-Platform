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

        User user = new User();
        user.setId(1);
        Role tutorRole = new Role();
        tutorRole.setName("tutor");

        Collection<Role> roles = new ArrayList<>();
        roles.add(tutorRole);

        user.setRoles(roles);

        when(userService.getByEmail(anyString())).thenReturn(Optional.of(user));
        when(bookingRepository.save(any())).thenReturn(new Booking()); // Mock saving of booking

        Booking savedBooking = bookingService.requestBooking(bookingPojo);

        assertNotNull(savedBooking);
    }

    @Test
    void getBookingsForLoggedInUser() {
        Authentication authentication = new UsernamePasswordAuthenticationToken("tutor@example.com", "password");
        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = new User();
        user.setEmail("tutor@example.com");

        when(userService.getByEmail(anyString())).thenReturn(Optional.of(user));
        when(bookingRepository.findByUser(any())).thenReturn(new ArrayList<>()); // Mock empty list of bookings

        List<Booking> bookings = bookingService.getBookingsForLoggedInUser();

        assertNotNull(bookings);
        assertEquals(0, bookings.size());
    }

    @Test
    void acceptBooking() {
        Authentication authentication = new UsernamePasswordAuthenticationToken("tutor@example.com", "password");
        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = new User();
        user.setEmail("tutor@example.com");

        Booking booking = new Booking();
        booking.setId(1);

        when(userService.getByEmail(anyString())).thenReturn(Optional.of(user));
        when(bookingRepository.findByIdAndUser(anyInt(), any())).thenReturn(Optional.of(booking));

        bookingService.acceptBooking(1);

        assertTrue(booking.isAccepted());
    }

    @Test
    void deleteBooking() {
        Authentication authentication = new UsernamePasswordAuthenticationToken("tutor@example.com", "password");
        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = new User();
        user.setEmail("tutor@example.com");

        Booking booking = new Booking();
        booking.setId(1);

        when(userService.getByEmail(anyString())).thenReturn(Optional.of(user));
        when(bookingRepository.findByIdAndUser(anyInt(), any())).thenReturn(Optional.of(booking));

        bookingService.deleteBooking(1);

        verify(bookingRepository, times(1)).delete(booking);
    }
}
