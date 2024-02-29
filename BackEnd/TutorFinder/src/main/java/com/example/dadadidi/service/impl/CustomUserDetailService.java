package com.example.dadadidi.service.impl;

import com.example.dadadidi.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        return (UserDetails) this.userRepo.getUserByEmail(userName)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }
}