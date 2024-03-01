package com.example.dadadidi.controller;


import com.example.dadadidi.service.BookingService;
import com.example.dadadidi.pojo.BookingPojo;
import  com.example.dadadidi.entity.Booking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;
    @PostMapping("/request")
    public ResponseEntity<Booking> requestBooking(@RequestBody BookingPojo bookingPojo) {
        Booking booking = bookingService.requestBooking(bookingPojo);
        return new ResponseEntity<>(booking, HttpStatus.CREATED);
    }
    @GetMapping("/my-bookings")
    public ResponseEntity<List<Booking>> getBookingsForLoggedInUser() {
        List<Booking> bookings = bookingService.getBookingsForLoggedInUser();
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }
    @PutMapping("/{bookingId}/accept")
//    @PreAuthorize("hasRole('TUTOR')") // Ensure only tutors can access this endpoint
    public ResponseEntity<String> acceptBooking(@PathVariable Integer bookingId) {
        bookingService.acceptBooking(bookingId);
        return new ResponseEntity<>("Booking accepted successfully", HttpStatus.OK);
    }

    @DeleteMapping("/{bookingId}")
//    @PreAuthorize("hasRole('TUTOR')") // Ensure only tutors can access this endpoint
    public ResponseEntity<String> deleteBooking(@PathVariable Integer bookingId) {
        bookingService.deleteBooking(bookingId);
        return new ResponseEntity<>("Booking deleted successfully", HttpStatus.OK);
    }
}
