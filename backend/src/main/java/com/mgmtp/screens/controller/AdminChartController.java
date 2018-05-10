package com.mgmtp.screens.controller;

import com.mgmtp.screens.model.BarChartDTO;
import com.mgmtp.screens.model.PlanDTO;
import com.mgmtp.screens.service.ChartService;
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
@RequestMapping("api/chart")
public class AdminChartController {

    private ChartService chartService;

    private UserService userService;

    @Autowired
    public AdminChartController(ChartService chartService, UserService userService) {

        this.chartService = chartService;
        this.userService = userService;

    }

    @RequestMapping(value = "/bar")
    @PreAuthorize("hasAuthority('read:charts')")
    public ResponseEntity<List<BarChartDTO>> getBarChart() {

        //Get user email authorized
        String emailAuthorized = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();

        List<BarChartDTO> chartDTOS = chartService.getBarChartData();

        if (chartDTOS == null) {
            return ResponseEntity.ok(null);
        }

        return ResponseEntity.ok(chartDTOS);

    }

}
