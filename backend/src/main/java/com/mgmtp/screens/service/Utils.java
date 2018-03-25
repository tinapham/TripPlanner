package com.mgmtp.screens.service;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Scanner;

public class Utils {
    public static String getMD5(String originalString) {
        try {
            MessageDigest messageDigest = MessageDigest.getInstance("MD5");
            byte[] keyBytes = messageDigest.digest(originalString.getBytes());
            StringBuilder keyStringBuffer = new StringBuilder();
            for (byte keyByte : keyBytes) {
                keyStringBuffer.append(keyByte);
            }
            return keyStringBuffer.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static JSONObject fetchAPIData(String hostURL) {
        URL url;
        try {
            url = new URL(hostURL);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.connect();
            int responseCode = connection.getResponseCode();
            if (responseCode != 200) {
                System.err.println("HttpResponseCode:" + responseCode);
                return null;
            } else {
                StringBuilder inline = new StringBuilder();
                Scanner scanner = new Scanner(url.openStream());
                while (scanner.hasNext()) {
                    inline.append(scanner.nextLine());
                }
                JSONParser parser = new JSONParser();
                JSONObject object = (JSONObject) parser.parse(inline.toString());
                scanner.close();
                return object;
            }
        } catch (IOException | ParseException e) {
            e.printStackTrace();
            return null;
        }
    }
}