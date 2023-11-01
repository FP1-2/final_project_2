package fs.socialnetworkapi.service;

import fs.socialnetworkapi.entity.Notification;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.exception.PostNotFoundException;
import fs.socialnetworkapi.repos.NotificationRepo;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class NotificationService {

  private final NotificationRepo notificationRepo;

  private User getUser() {
    return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }

  public Notification createNewNotification(Notification notification) {
    return notificationRepo.save(notification);
  }

  public List<Notification> getAllNotifications() {
    return notificationRepo.findAllByNotifyingUserId(getUser().getId());
  }

  public List<Notification> getActiveNotifications() {
    return getAllNotifications().stream().filter(Notification::isActive).toList();
  }

  public boolean markNotificationAsRead(Long notificationId) {
    Notification notification = notificationRepo.findById(notificationId)
            .orElseThrow(() -> new PostNotFoundException("No such notification"));
    if (notification.isActive()) {
      notification.setActive(false);
      notificationRepo.save(notification);
      return true;
    }
    return false;
  }

  public void deleteByPostId(Long postId) {
    notificationRepo.deleteAllByPostId(postId);
  }

  public void deleteByUserId(Long userId) {
    notificationRepo.deleteAllByUserId(userId);
  }

  public void deleteByMessageId(Long messageId) {
    notificationRepo.deleteAllByMessageId(messageId);
  }

}
