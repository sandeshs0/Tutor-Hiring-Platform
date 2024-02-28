package com.example.notesharing.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tutors")
@Getter
@Setter
public class Tutor {
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

    @Column(name = "hourlyRate", nullable = false)
    private Double hourlyRate;

    @Column(name = "yearsOfExp", nullable = false)
    private Double yearsOfExp;

    @Column(name = "bio")
    private String bio;

    @ElementCollection
    @CollectionTable(name = "tutor_subjects", joinColumns = @JoinColumn(name = "tutor_id"))
    @Column(name = "subject")
    private Set<String> subjects = new HashSet<>();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}