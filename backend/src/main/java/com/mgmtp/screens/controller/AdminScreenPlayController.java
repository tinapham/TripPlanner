package com.mgmtp.screens.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;
import static com.mgmtp.screens.constant.ResponseStatus.*;
import com.mgmtp.screens.model.ScreenPlayDTO;
import com.mgmtp.screens.service.ScreenPlayService;
import com.mgmtp.screens.service.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/admin/api/screenplay")
public class AdminScreenPlayController {

	private ScreenPlayService screenPlayService;

	private UserService userService;

	@Autowired
	public AdminScreenPlayController(ScreenPlayService screenPlayService, UserService userService) {
		this.screenPlayService = screenPlayService;
		this.userService = userService;
	}

	@RequestMapping()
	@PreAuthorize("hasAuthority('read:screenPlays')")
	public ResponseEntity<List<ScreenPlayDTO>> getAll() {
		//Get user email authorized
		String emailAuthorized = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
		List<ScreenPlayDTO> screenPlays = userService.isAdmin(emailAuthorized) ?
				screenPlayService.findAll(true)
				: screenPlayService.findAllByUser(emailAuthorized);
		if (screenPlays == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		return ResponseEntity.ok(screenPlays);
	}

	@PreAuthorize("hasAuthority('create:screenPlay')")
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<String> addScreensPlay(@RequestBody ScreenPlayDTO request) {
		String emailAuthorized = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
		screenPlayService.addNewScreenPlay(request, userService.getUserEntity(emailAuthorized));
		return ResponseEntity.ok(SUCCESS);
	}

	@RequestMapping(value = "/{name}")
	@PreAuthorize("hasAuthority('read:screenPlay')")
	public ResponseEntity<ScreenPlayDTO> getScreensPlay(@PathVariable String name) {
		ScreenPlayDTO screenPlay = screenPlayService.findByName(name, true);
		if (screenPlay == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		return ResponseEntity.ok(screenPlay);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	@PreAuthorize("hasAuthority('write:screenPlay')")
	public ResponseEntity<String> updateScreensPlay(@RequestBody ScreenPlayDTO request, @PathVariable int id) {
		if (!screenPlayService.isExist(id)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ERROR);
		}
		screenPlayService.updateScreenPlay(id, request);
		return ResponseEntity.ok(SUCCESS);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@PreAuthorize("hasAuthority('delete:screenPlay')")
	public ResponseEntity<?> deleteScreensPlay(@PathVariable int id) {
		if (!screenPlayService.isExist(id)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ERROR);
		}
		screenPlayService.deleteById(id);
		return ResponseEntity.ok(SUCCESS);
	}

}
