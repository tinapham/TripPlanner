package com.mgmtp.screens.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mgmtp.screens.model.ScreenPlayDTO;
import com.mgmtp.screens.service.ScreenPlayService;

@RestController
@RequestMapping("/api/screenplay")
public class ScreenPlayController {

	private ScreenPlayService screenPlayService;

	@Autowired
	public ScreenPlayController(ScreenPlayService screenPlayService) {
		this.screenPlayService = screenPlayService;
	}

	@RequestMapping()
	public ResponseEntity<List<ScreenPlayDTO>> getAll() {
		List<ScreenPlayDTO> screenPlays = screenPlayService.findAll(false);
		if (screenPlays == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		return ResponseEntity.ok(screenPlays);
	}

	@RequestMapping(value = "/{name}")
	public ResponseEntity<ScreenPlayDTO> getScreensPlay(@PathVariable String name) {
		ScreenPlayDTO screenPlay = screenPlayService.findByName(name, false);
		if (screenPlay == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		return ResponseEntity.ok(screenPlay);
	}

}
