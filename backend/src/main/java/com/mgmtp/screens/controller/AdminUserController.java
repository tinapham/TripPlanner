package com.mgmtp.screens.controller;

import com.mgmtp.screens.model.UserDTO;
import com.mgmtp.screens.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import com.mgmtp.screens.model.UpdatingUserDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import static com.mgmtp.screens.constant.ResponseStatus.*;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/admin/api/user")
public class AdminUserController {

    private UserService userService;

    @Autowired
    public AdminUserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping()
    @PreAuthorize("hasAuthority('read:users')")
    public ResponseEntity<List<UserDTO>> getAll() {
        //Get user email authorized
        String emailAuthorized = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        List<UserDTO> users = userService.isAdmin(emailAuthorized) ?
                userService.findAll()
                : null;
        if (users == null) {
            return ResponseEntity.ok(null);
        }
        return ResponseEntity.ok(users);
    }

    @RequestMapping("/getEmail")
    @PreAuthorize("hasAuthority('read:user')")
    public ResponseEntity<String> getEmail() {
        //Get user email authorized
        String emailAuthorized = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        return ResponseEntity.ok(emailAuthorized);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @PreAuthorize("hasAuthority('delete:user')")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        return userService.deleteById(id)
                ? ResponseEntity.ok(SUCCESS)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body(ERROR);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/update")
    @PreAuthorize("hasAuthority('write:user')")
    public ResponseEntity<String> update(@RequestBody UpdatingUserDTO updatingUserDTO) {
        if (userService.isAdmin(updatingUserDTO.getEmail())) {
            return ResponseEntity.ok(USER_IS_ADMIN);
        }
        if (userService.updateUser(updatingUserDTO)) {
            return ResponseEntity.ok(SUCCESS);
        }
        return ResponseEntity.ok(ERROR);
    }
}
