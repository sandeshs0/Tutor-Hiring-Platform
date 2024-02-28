package com.example.notesharing.service;
import com.example.notesharing.pojo.AuthenticateRequest;
import com.example.notesharing.pojo.AuthenticateResponse;

public interface AuthenticateService {

    AuthenticateResponse authenticate(AuthenticateRequest authenticateRequest);
}