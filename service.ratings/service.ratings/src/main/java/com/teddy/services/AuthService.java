package com.teddy.services;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.teddy.auth.dto.AuthRequest;
import com.teddy.auth.dto.AuthResponse;
import com.teddy.models.UserAccount;
import com.teddy.repositories.UserAccountRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserAccountRepository userAccountRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthResponse register(AuthRequest request) {
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (request.getPassword() == null || request.getPassword().isBlank()) {
            throw new IllegalArgumentException("Password is required");
        }
        if (userAccountRepository.findByEmailIgnoreCase(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        String name = (request.getName() == null || request.getName().isBlank())
                ? request.getEmail().split("@")[0]
                : request.getName().trim();

        UserAccount user = new UserAccount(
                null,
                name,
                request.getEmail().trim().toLowerCase(),
                passwordEncoder.encode(request.getPassword()),
                System.currentTimeMillis());

        UserAccount saved = userAccountRepository.save(user);
        return new AuthResponse(saved.getName(), saved.getEmail());
    }

    public AuthResponse login(AuthRequest request) {
        if (request.getEmail() == null || request.getPassword() == null) {
            throw new IllegalArgumentException("Email and password are required");
        }

        UserAccount user = userAccountRepository.findByEmailIgnoreCase(request.getEmail().trim())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        return new AuthResponse(user.getName(), user.getEmail());
    }
}
