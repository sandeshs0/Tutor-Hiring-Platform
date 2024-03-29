package com.example.dadadidi.entity;

import jakarta.persistence.*;
import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name="users")
public class User implements UserDetails {
    @Id
    @SequenceGenerator(name = "user_seq_gen", sequenceName = "user_id_seq",allocationSize = 1)
    @GeneratedValue(generator="user_seq_gen", strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column(name="full_name", nullable = false, length = 255)
    private String fullName;

    @Column(name="subject", nullable = false, length = 255)
    private String subject;

    @Column(name="user_name", nullable = false, unique = true)
    private String userName;

    @Column(name="email", nullable = false, unique = true)
    private String email;

    @Column(name="phone", nullable = false, unique = true)
    private String phone;

    @Column(name="address", nullable = false, length = 255)
    private String address;

    @Column(name="bio", nullable = false, length = 255)
    private String bio;

    @Column(name = "profilePic", nullable = false)
    private String profilePic;

    @Column(name = "monthlyFee", nullable = false)
    private Double monthlyFee;

    @Column(name = "yearsOfExp", nullable = false)
    private Double yearsOfExp;

    @Column(name="password", nullable = false)
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "users_roles",
            foreignKey = @ForeignKey(name = "FK_users_roles_userId"),
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseForeignKey = @ForeignKey(name = "FK_users_roles_roleId"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"),
            uniqueConstraints = @UniqueConstraint(name = "UNIQUE_users_roles_userIdRoleId",
                    columnNames = {"user_id", "role_id"})
    )
    private Collection<Role> roles;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
