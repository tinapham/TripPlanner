package com.mgmtp.screens.controller;

import com.mgmtp.screens.model.FeedbackDTO;
import com.mgmtp.screens.model.PlanDTO;
import com.mgmtp.screens.service.FeedbackService;
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
@RequestMapping("api/feedback")
public class FeedbackController {

    private FeedbackService feedbackService;

    private UserService userService;

    @Autowired
    public FeedbackController(FeedbackService feedbackService, UserService userService) {

        this.feedbackService = feedbackService;
        this.userService = userService;

    }

    @PreAuthorize("hasAuthority('create:feedback')")
    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public ResponseEntity<String> addNewFeedback(@RequestBody FeedbackDTO request, @PathVariable Integer id) {

        String emailAuthorized = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        feedbackService.addFeedback(request, id, userService.getUserEntity(emailAuthorized));
        return ResponseEntity.ok(SUCCESS);

    }

}
