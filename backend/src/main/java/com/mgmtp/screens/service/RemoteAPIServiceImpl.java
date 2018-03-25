package com.mgmtp.screens.service;

import com.mgmtp.screens.model.RemoteAPIData;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class RemoteAPIServiceImpl implements RemoteAPIService {
    @Autowired
    private static Map<String, RemoteAPIData> apiDataHashMap;

    static {
        apiDataHashMap = new HashMap<>();
    }

    @Override
    public JSONObject fetchRemoteAPIData(String hostURL, int exSec) {
        String code = Utils.getMD5(hostURL);

        apiDataHashMap.computeIfAbsent(code, (String key) -> new RemoteAPIData(Utils.fetchAPIData(hostURL), new Date(new Date().getTime()
                + exSec * 1000)));

        RemoteAPIData retRemoteAPIData = apiDataHashMap.computeIfPresent(code, (String key, RemoteAPIData value) -> {
            if (value.getExpireDate().after(new Date())) {
                return value;
            }
            value = new RemoteAPIData(Utils.fetchAPIData(hostURL), new Date(new Date().getTime() + exSec * 1000));
            return value;
        });
        return retRemoteAPIData.getJsonData();
    }
}
