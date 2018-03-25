package com.mgmtp.screens.controller;

import com.mgmtp.screens.model.UserDTO;
import com.mgmtp.screens.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

import static com.mgmtp.screens.constant.ResponseStatus.*;
import static com.mgmtp.screens.constant.SecurityConstants.LONG_EXPIRATION_TIME;
import static com.mgmtp.screens.constant.SecurityConstants.SHORT_EXPIRATION_TIME;


@RestController
@RequestMapping("/api/user")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/{checkRemember}")
    public ResponseEntity<?> login(@RequestBody UserDTO request, @PathVariable boolean checkRemember) {
        long expireTime = checkRemember ? LONG_EXPIRATION_TIME : SHORT_EXPIRATION_TIME;
        Date expireAt = new Date(System.currentTimeMillis() + expireTime);
        String accessToken = userService.getAccessToken(request, expireAt);
        if (accessToken.equals("")) {
            return ResponseEntity.ok(USER_NOT_FOUND);
        }
        return ResponseEntity.ok(accessToken);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/add")
    public ResponseEntity<String> register(@RequestBody UserDTO request) {
        if (userService.isExist(request.getEmail())) {
            return ResponseEntity.ok(USER_IS_EXISTED);
        }
        if (userService.addUser(request)) {
            return ResponseEntity.ok(SUCCESS);
        }
        return ResponseEntity.ok(ERROR);
    }
}
