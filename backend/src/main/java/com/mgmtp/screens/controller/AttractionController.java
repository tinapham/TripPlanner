package com.mgmtp.screens.controller;

import com.mgmtp.screens.model.AttractionDTO;
import com.mgmtp.screens.service.AttractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @Autowired
    public AttractionController(AttractionService attractionService) {
        this.attractionService = attractionService;
    }

    @RequestMapping()
    @PreAuthorize("hasAuthority('read:attractions')")
    public ResponseEntity<List<AttractionDTO>> getAll() {
        List<AttractionDTO> attractionDTOS = attractionService.findAll();
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

}
