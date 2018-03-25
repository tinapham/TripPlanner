package com.mgmtp.screens.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class UpdatingUserDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private final String email;

    private final String password;

    private final String newPassword;

    public UpdatingUserDTO(@JsonProperty("email") String email,
                           @JsonProperty("password") String password,
                           @JsonProperty("newPassword") String newPassword) {
        this.email = email;
        this.password = password;
        this.newPassword = newPassword;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getNewPassword() {
        return newPassword;
    }
}
