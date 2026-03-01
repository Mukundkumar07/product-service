package com.arogya.notification.controller;

import com.arogya.notification.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("/push")
    public ResponseEntity<String> sendPush(@RequestBody Map<String, String> request) {
        String messageId = notificationService.sendPushNotification(
                request.get("token"),
                request.get("title"),
                request.get("body"),
                Map.of("category", request.getOrDefault("category", "info")));
        return ResponseEntity.ok("Notification sent: " + messageId);
    }
}
