package com.mgmtp.screens.constant;

public class SecurityConstants {
    public static final String SECRET = "mgmScreensSecretKeyJWT";
    public static final long SHORT_EXPIRATION_TIME = 10_800_000; // 3 hours
    public static final long LONG_EXPIRATION_TIME = 432_000_000; // 5 days
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String USER_URL = "/api/user/**";
    public static final String PUBLIC_SCREENPLAY_URL = "/api/screenplay/**";
    public static final String MARKET_URL = "/api/attraction";
    public static final String MARKET_NAME_URL = "/api/attraction/**";
    public static final String REMOTE_API = "/api/remoteAPI/";
}
