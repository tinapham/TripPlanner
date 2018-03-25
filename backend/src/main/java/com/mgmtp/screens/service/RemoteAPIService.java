package com.mgmtp.screens.service;

import org.json.simple.JSONObject;

public interface RemoteAPIService {
    JSONObject fetchRemoteAPIData(String hostURL, int exSec);
}
