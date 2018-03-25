package com.mgmtp.screens.model;

import org.json.simple.JSONObject;

import java.util.Date;

public class RemoteAPIData {
    private JSONObject jsonData;
    private Date expireDate;

    public RemoteAPIData(JSONObject jsonData, Date expireDate) {
        this.jsonData = jsonData;
        this.expireDate = expireDate;
    }

    public JSONObject getJsonData() {
        return jsonData;
    }

    public void setJsonData(JSONObject jsonData) {
        this.jsonData = jsonData;
    }

    public Date getExpireDate() {
        return expireDate;
    }

    public void setExpireDate(Date expireDate) {
        this.expireDate = expireDate;
    }
}
