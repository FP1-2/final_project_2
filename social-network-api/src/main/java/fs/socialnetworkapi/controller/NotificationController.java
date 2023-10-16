package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.entity.Notification;
import fs.socialnetworkapi.service.NotificationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
@AllArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Notification>> getNotificationsByUser(@PathVariable Long userId) {
        List<Notification> notifications = notificationService.getNotificationsByUser(userId);
        return ResponseEntity.ok(notifications);
    }

    @GetMapping("/active/{userId}")
    public ResponseEntity<List<Notification>> getActiveNotifications(@PathVariable Long userId) {
        List<Notification> activeNotifications = notificationService.getActiveNotifications(userId);
        return ResponseEntity.ok(activeNotifications);
    }

    @PostMapping("/markAsRead/{notificationId}")
    public ResponseEntity<String> markNotificationAsRead(@PathVariable Long notificationId) {
        return notificationService.markNotificationAsRead(notificationId)
                ? ResponseEntity.ok("Notification marked as read.")
                : ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Notification is not active.");
    }

}
