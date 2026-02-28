package com.arogya.auth.service;

import com.arogya.auth.config.JwtUtils;
import com.arogya.auth.model.Role;
import com.arogya.auth.model.User;
import com.arogya.auth.repository.UserRepository;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private final JwtUtils jwtUtils;

    public AuthService(UserRepository userRepository, RedisTemplate<String, String> redisTemplate, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.redisTemplate = redisTemplate;
        this.jwtUtils = jwtUtils;
    }

    private static final String OTP_PREFIX = "OTP_";
    private static final long OTP_EXPIRY_MINUTES = 5;

    public void generateOtp(String phone) {
        String otp = String.format("%06d", new Random().nextInt(999999));
        redisTemplate.opsForValue().set(OTP_PREFIX + phone, otp, Duration.ofMinutes(OTP_EXPIRY_MINUTES));
        // In real app, send via SMS gateway (SNS/Twilio)
        System.out.println("Generated OTP for " + phone + " : " + otp);
    }

    public String verifyOtp(String phone, String otp) {
        String storedOtp = redisTemplate.opsForValue().get(OTP_PREFIX + phone);

        if (storedOtp != null && storedOtp.equals(otp)) {
            redisTemplate.delete(OTP_PREFIX + phone);

            User user = userRepository.findByPhone(phone)
                    .orElseGet(() -> userRepository.save(User.builder()
                            .phone(phone)
                            .role(Role.PATIENT) // Default role
                            .build()));

            Map<String, Object> claims = new HashMap<>();
            claims.put("role", user.getRole().name());
            claims.put("userId", user.getId().toString());

            return jwtUtils.generateToken(phone, claims);
        }
        throw new RuntimeException("Invalid or expired OTP");
    }
}
