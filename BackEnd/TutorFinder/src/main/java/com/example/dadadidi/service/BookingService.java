package com.example.dadadidi.service;

import com.example.dadadidi.entity.Booking;
import com.example.dadadidi.pojo.BookingPojo;

import java.util.List;

public interface BookingService {
    Booking requestBooking(BookingPojo bookingPojo);
    List<Booking> getBookingsForLoggedInUser();
    void acceptBooking(Integer bookingId);
    void deleteBooking(Integer bookingId);
}