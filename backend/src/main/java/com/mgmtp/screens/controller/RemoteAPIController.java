package com.mgmtp.screens.controller;

import com.mgmtp.screens.service.RemoteAPIService;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/remoteAPI")
public class RemoteAPIController {
    @Autowired
    private RemoteAPIService remoteAPIService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<JSONObject> testFunction(@RequestParam(value = "url") String url, @RequestParam(value = "ex_sec") int exSec) {
        if (url == null || url.trim().length() == 0 || exSec <= 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        JSONObject jsonObject = remoteAPIService.fetchRemoteAPIData(url, exSec);
        if (jsonObject == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(jsonObject);
    }
}