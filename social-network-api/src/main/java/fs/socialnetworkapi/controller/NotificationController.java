package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.entity.Notification;
import fs.socialnetworkapi.service.NotificationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
@AllArgsConstructor
public class NotificationController {
  private final NotificationService notificationService;

  @GetMapping("/all")
  public ResponseEntity<List<Notification>> getAllNotifications() {
    List<Notification> notifications = notificationService.getAllNotifications();
    return ResponseEntity.ok(notifications);
  }

  @GetMapping("/active")
  public ResponseEntity<List<Notification>> getActiveNotifications() {
    List<Notification> activeNotifications = notificationService.getActiveNotifications();
    return ResponseEntity.ok(activeNotifications);
  }

  @PostMapping("/markAsRead/{notificationId}")
  public ResponseEntity<String> markNotificationAsRead(@PathVariable Long notificationId) {
    return notificationService.markNotificationAsRead(notificationId)
            ? ResponseEntity.ok("Notification marked as read.")
            : ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Notification is not active.");
  }

}
