package com.example.notesharing.pojo;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserPojo {

    private Integer id;

    @NotNull(message = "Full name is required")
    private String fullName;

    @NotNull(message = "Subject is required")
    private String subject;

    @NotNull(message = "Username is required")
    private String userName;

    @NotNull(message = "Email is required")
    private String email;

    @NotNull(message = "Phone number is required")
    private String phone;

    @NotNull(message = "Address is required")
    private String address;

    @NotNull(message = "Bio is required")
    private String bio;

    @NotNull(message = "Profile picture URL is required")
    private MultipartFile profilePic;

    @NotNull(message = "Monthly fee is required")
    private Double monthlyFee;

    @NotNull(message = "Years of experience is required")
    private Double yearsOfExp;

    @NotNull(message = "Password is required")
    private String password;
}
