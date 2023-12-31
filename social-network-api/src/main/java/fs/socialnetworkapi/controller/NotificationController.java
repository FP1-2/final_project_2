package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.dto.notification.NotificationDtoOut;
import fs.socialnetworkapi.service.NotificationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
@AllArgsConstructor
public class NotificationController {
  private final NotificationService notificationService;

  @GetMapping("/all")
  public ResponseEntity<List<NotificationDtoOut>> getAllNotifications(
    @RequestParam(value = "page", defaultValue = "0") Integer page,
    @RequestParam(value = "size", defaultValue = "10") Integer size) {

    List<NotificationDtoOut> notifications = notificationService.getAllNotifications(page, size);
    return ResponseEntity.ok(notifications);
  }

  @GetMapping("/active")
  public ResponseEntity<List<NotificationDtoOut>> getActiveNotifications(
    @RequestParam(value = "page", defaultValue = "0") Integer page,
    @RequestParam(value = "size", defaultValue = "10") Integer size) {

    List<NotificationDtoOut> activeNotifications = notificationService.getActiveNotifications(page, size);
    return ResponseEntity.ok(activeNotifications);
  }

  @PostMapping("/markAsRead/{notificationId}")
  public ResponseEntity<String> markNotificationAsRead(@PathVariable Long notificationId) {
    return notificationService.markNotificationAsRead(notificationId)
            ? ResponseEntity.ok("Notification marked as read.")
            : ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Notification is not active.");
  }

  @PostMapping("/read")
  public ResponseEntity<?> readAll() {
    notificationService.readAll();
    return ResponseEntity.ok().build();
  }

}
