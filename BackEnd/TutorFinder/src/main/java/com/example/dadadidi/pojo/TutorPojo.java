package com.example.dadadidi.pojo;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TutorPojo {

    private Integer id;

    @NotNull(message = "Name is required")
    private String name;

    @NotNull(message = "Address is required")
    private String address;

    @NotNull(message = "Profile picture URL is required")
    private String profilePic;

    @NotNull(message = "Cover picture URL is required")
    private String coverPic;

    @NotNull(message = "Hourly rate is required")
    private Double hourlyRate;

    @NotNull(message = "Years of experience is required")
    private Double yearsOfExp;

    @NotNull(message = "BIO required")
    private String bio;

    @NotEmpty(message = "At least one subject must be provided")
    private Set<String> subjects = new HashSet<>();

    @NotNull(message = "User ID is required")
    private Integer userId;
}
