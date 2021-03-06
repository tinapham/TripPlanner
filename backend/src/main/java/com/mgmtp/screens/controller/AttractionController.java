package com.mgmtp.screens.controller;

import com.mgmtp.screens.entity.AttractionEntity;
import com.mgmtp.screens.model.AttractionDTO;
import com.mgmtp.screens.service.AttractionService;
import com.mgmtp.screens.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/attraction")
public class AttractionController {

    private AttractionService attractionService;

    private UserService userService;

    @Autowired
    public AttractionController(AttractionService attractionService, UserService userService) {
        this.attractionService = attractionService;
        this.userService = userService;
    }

    @RequestMapping()
    @PreAuthorize("hasAuthority('read:attractions')")
    public ResponseEntity<List<AttractionDTO>> getAll() {
        String emailAuthorized = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        List<AttractionDTO> attractionDTOS = attractionService.findAllByUser(userService.getUserEntity(emailAuthorized));
        if (attractionDTOS == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(attractionDTOS);
    }

    @RequestMapping(value = "/{name}")
    @PreAuthorize("hasAuthority('read:attraction')")
    public ResponseEntity<AttractionDTO> getAttraction(@PathVariable String name) {
        AttractionDTO attraction = attractionService.findByName(name);
        if (attraction == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(attraction);
    }

    @RequestMapping(value = "/favorite/{id}")
    @PreAuthorize("hasAuthority('write:favorite')")
    public ResponseEntity<Boolean> addFavorite(@PathVariable Integer id) {

//        try{
            String emailAuthorized = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
            attractionService.updateFavorite(id, userService.getUserEntity(emailAuthorized));
//        } catch (Exception e) {
//            return ResponseEntity.ok(false);
//        }
        return ResponseEntity.ok(true);
    }

}
