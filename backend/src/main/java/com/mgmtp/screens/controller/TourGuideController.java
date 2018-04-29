package com.mgmtp.screens.controller;

import com.mgmtp.screens.model.TourGuideDTO;
import com.mgmtp.screens.service.TourGuideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tour-guide")
public class TourGuideController {

    private TourGuideService tourGuideService;


    @Autowired
    public TourGuideController(TourGuideService tourGuideService) {

        this.tourGuideService = tourGuideService;

    }

    @RequestMapping()
    public ResponseEntity<List<TourGuideDTO>> getAll() {

        List<TourGuideDTO> tourGuides = tourGuideService.findAll();
        if (tourGuides == null) {
            return ResponseEntity.ok(null);
        }
        return ResponseEntity.ok(tourGuides);

    }

}
