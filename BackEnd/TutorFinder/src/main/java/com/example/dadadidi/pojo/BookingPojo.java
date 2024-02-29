package com.example.dadadidi.pojo;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingPojo {
    private Integer id;

    @NotNull(message = "User ID is required")
    private Integer userId;

    private boolean accepted;

    @NotNull(message = "Student name is required")
    private String studentName;

    @NotNull(message = "Time is required")
    private String time;

    @NotNull(message = "Grade is required")
    private String grade;

    @NotNull(message = "Requirements is required")
    private String requirements;

    @NotNull(message = "Location is required")
    private String location;

    @NotNull(message = "tutor email is required")
    private String tutorEmail;

    @NotNull(message = "student email is required")
    private String studentEmail;

    @NotNull(message = "Offered fee is required")
    private Integer offeredFee;

}
