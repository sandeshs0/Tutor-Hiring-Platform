package com.example.notesharing.pojo;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.NotEmpty;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserPojo {

    private Integer id;

    @NotNull(message = "First Name is required")
    private String firstName;

    @NotNull(message = "Last Name is required")
    private String lastName;

    @NotNull(message = "Username is required")
    private String userName;

    @NotNull(message = "Email is required")
    private String email;

    @NotNull(message = "Phone number is required")
    private String phone;

    @NotNull
    private String password;
}
