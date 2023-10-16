package fs.socialnetworkapi.service;

import fs.socialnetworkapi.entity.Notification;
import fs.socialnetworkapi.exception.PostNotFoundException;
import fs.socialnetworkapi.repos.NotificationRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class NotificationService {

    private final NotificationRepo notificationRepo;

    public List<Notification> getNotificationsByUser(Long userId) {
        return notificationRepo.findByUserId(userId);
    }

    public List<Notification> getActiveNotifications(Long userId) {
        return getNotificationsByUser(userId).stream().filter(Notification::isActive).toList();
    }

    public boolean markNotificationAsRead(Long notificationId) {
        Notification notification = notificationRepo.findById(notificationId)
                .orElseThrow(() -> new PostNotFoundException("No such notification"));
        if (notification.isActive()) {
            notification.markAsRead();
            notificationRepo.save(notification);
            return true;
        }
        return false;
    }
}
