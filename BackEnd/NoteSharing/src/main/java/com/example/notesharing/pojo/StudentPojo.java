package com.example.notesharing.pojo;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentPojo {

    private Integer id;

    @NotNull(message = "Name is required")
    private String name;

    @NotNull(message = "Address is required")
    private String address;

    @NotNull(message = "Profile picture is required")
    private String profilePic;

    @NotNull(message = "Cover picture is required")
    private String coverPic;

    @NotNull(message = "Educational level is required")
    private String educationalLevel;

    @NotNull(message = "Bio is required")
    private String bio;
}
