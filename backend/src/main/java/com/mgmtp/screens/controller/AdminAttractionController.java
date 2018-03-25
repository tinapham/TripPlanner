package com.mgmtp.screens.controller;

import com.mgmtp.screens.model.AttractionDTO;
import com.mgmtp.screens.service.AttractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.mgmtp.screens.constant.ResponseStatus.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("admin/api/attraction")
public class AdminAttractionController {

    private AttractionService attractionService;

    @Autowired
    public AdminAttractionController(AttractionService attractionService) {
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

    @RequestMapping(method = RequestMethod.POST)
    @PreAuthorize("hasAuthority('create:attraction')")
    public ResponseEntity<String> addAttraction(@RequestBody AttractionDTO request) {
        attractionService.addNewAttraction(request);
        return ResponseEntity.ok(SUCCESS);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @PreAuthorize("hasAuthority('write:attraction')")
    public ResponseEntity<String> updateAttraction(@RequestBody AttractionDTO request, @PathVariable int id) {
        if (!attractionService.isExist(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ERROR);
        }
        attractionService.updateAttraction(id, request);
        return ResponseEntity.ok(SUCCESS);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @PreAuthorize("hasAuthority('delete:attraction')")
    public ResponseEntity<?> deleteAttraction(@PathVariable int id) {
        if (!attractionService.isExist(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ERROR);
        }
        attractionService.deleteById(id);
        return ResponseEntity.ok(SUCCESS);
    }

}
