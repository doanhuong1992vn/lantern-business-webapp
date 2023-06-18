package com.lantern_business_webapp.service;

public interface SecurityService {
    boolean isAuthenticated();
    boolean isValidToken(String token);
}
