package com.example.dadadidi.service;
import com.example.dadadidi.pojo.AuthenticateRequest;
import com.example.dadadidi.pojo.AuthenticateResponse;

public interface AuthenticateService {

    AuthenticateResponse authenticate(AuthenticateRequest authenticateRequest);
}