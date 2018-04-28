package com.mgmtp.screens.controller;

import com.mgmtp.screens.model.PlanDTO;
import com.mgmtp.screens.service.PlanService;
import com.mgmtp.screens.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.mgmtp.screens.constant.ResponseStatus.ERROR;
import static com.mgmtp.screens.constant.ResponseStatus.SUCCESS;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("admin/api/plan")
public class AdminPlanController {

    private PlanService planService;

    private UserService userService;

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

    @PreAuthorize("hasAuthority('create:plan')")
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<String> addNewPlan(@RequestBody PlanDTO request) {
        String emailAuthorized = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        planService.addNewPlan(request, userService.getUserEntity(emailAuthorized));
        return ResponseEntity.ok(SUCCESS);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @PreAuthorize("hasAuthority('write:plan')")
    public ResponseEntity<String> updatePlan(@RequestBody PlanDTO request, @PathVariable int id) {
        if (!planService.isExist(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ERROR);
        }
        planService.updatePlan(id, request);
        return ResponseEntity.ok(SUCCESS);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @PreAuthorize("hasAuthority('delete:screenPlay')")
    public ResponseEntity<?> deletePlan(@PathVariable int id) {
        if (!planService.isExist(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ERROR);
        }
        planService.deleteById(id);
        return ResponseEntity.ok(SUCCESS);
    }

}
