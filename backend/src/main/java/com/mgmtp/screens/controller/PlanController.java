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
@RequestMapping("api/plan")
public class PlanController {

    private PlanService planService;

    private UserService userService;

    @Autowired
    public PlanController(PlanService planService, UserService userService) {

        this.planService = planService;
        this.userService = userService;

    }

    @RequestMapping()
    @PreAuthorize("hasAuthority('read:plans')")
    public ResponseEntity<List<PlanDTO>> getMyPlans() {

        //Get user email authorized
        String emailAuthorized = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();

        List<PlanDTO> planDTOS = planService.findAllByUser(emailAuthorized);

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

    @RequestMapping(value = "/{id}/{token}", method = RequestMethod.PUT)
    @PreAuthorize("hasAuthority('write:plan')")
    public ResponseEntity<String> updatePlanWithToken(@RequestBody PlanDTO request, @PathVariable("id") int id,
                                                      @PathVariable("token") String token) {

        if (!planService.isExist(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ERROR);
        }

        planService.updatePlan(id, request, token);
        return ResponseEntity.ok(SUCCESS);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @PreAuthorize("hasAuthority('delete:plan')")
    public ResponseEntity<?> deleteById(@PathVariable int id) {

        if (!planService.isExist(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ERROR);
        }

        planService.deleteById(id);
        return ResponseEntity.ok(SUCCESS);
    }

    @RequestMapping(value = "/token/{id}")
    @PreAuthorize("hasAuthority('read:token')")
    public ResponseEntity<?> getPaymentToken(@PathVariable int id) {

        if (!planService.isExist(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ERROR);
        }

        return ResponseEntity.ok(planService.getPaymentToken(id));
    }

}
