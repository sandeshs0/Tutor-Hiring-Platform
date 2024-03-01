package com.example.dadadidi.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
@Entity
@Table(name = "bookings")
@Getter
@Setter
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "accepted", nullable = false)
    private boolean accepted = false;

    @Column(name = "student_name",nullable=false)
    private String student_name;

    @Column(name = "tutor_email",nullable=false)
    private String tutorEmail;

    @Column(name = "time",nullable=false)
    private String time;

    @Column(name = "grade",nullable=false)
    private String grade;

    @Column(name = "requirements",nullable=false)
    private String requirements;

    @Column(name = "location",nullable=false)
    private String location;

    @Column(name = "student_email",nullable=false)
    private String studentEmail;

    @Column(name = "offeredFee",nullable=false)
    private Integer offeredFee;

}
