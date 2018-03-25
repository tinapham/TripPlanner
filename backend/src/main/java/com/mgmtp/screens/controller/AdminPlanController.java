package com.mgmtp.screens.controller;

import com.mgmtp.screens.model.PlanDTO;
import com.mgmtp.screens.service.PlanService;
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
@RequestMapping("admin/api/plan")
public class AdminPlanController {

    private PlanService planService;

    @Autowired
    public AdminPlanController(PlanService planService) {
        this.planService = planService;
    }

    @RequestMapping()
    @PreAuthorize("hasAuthority('read:plans')")
    public ResponseEntity<List<PlanDTO>> getAll() {
        List<PlanDTO> planDTOS = planService.findAll(true);
        if (planDTOS == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(planDTOS);
    }

    @RequestMapping(value = "/{name}")
    @PreAuthorize("hasAuthority('read:plan')")
    public ResponseEntity<PlanDTO> getPlan(@PathVariable String name) {
        PlanDTO planDTO = planService.findByName(name);
        if (planDTO == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(planDTO);
    }

}
