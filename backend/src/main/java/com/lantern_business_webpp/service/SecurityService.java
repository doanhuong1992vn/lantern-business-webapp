package com.lantern_business_webpp.service;

public interface SecurityService {
    boolean isAuthenticated();
    boolean isValidToken(String token);
}
