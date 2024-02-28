package com.example.notesharing.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "students")
@Getter
@Setter
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "profilePic", nullable = false)
    private String profilePic;

    @Column(name = "coverPic", nullable = false)
    private String coverPic;

    @Column(name = "educationalLevel", nullable = false)
    private String educationalLevel;

    @Column(name = "bio", nullable = false)
    private String bio;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

}
