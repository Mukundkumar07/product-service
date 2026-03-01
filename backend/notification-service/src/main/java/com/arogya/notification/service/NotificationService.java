package com.arogya.notification.service;

import com.google.firebase.messaging.*;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class NotificationService {

    public String sendPushNotification(String token, String title, String body, Map<String, String> data) {
        Message message = Message.builder()
                .setToken(token)
                .setNotification(Notification.builder()
                        .setTitle(title)
                        .setBody(body)
                        .build())
                .putAllData(data)
                .build();

        try {
            return FirebaseMessaging.getInstance().send(message);
        } catch (FirebaseMessagingException e) {
            throw new RuntimeException("Error sending FCM notification", e);
        }
    }
}
