package fs.socialnetworkapi.service;

import fs.socialnetworkapi.dto.notification.NotificationDtoOut;
import fs.socialnetworkapi.entity.Notification;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.exception.PostNotFoundException;
import fs.socialnetworkapi.repos.NotificationRepo;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class NotificationService {

  private final NotificationRepo notificationRepo;
  private final ModelMapper mapper;

  private User getUser() {
    return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }

  public void createNewNotification(Notification notification) {
    notificationRepo.save(notification);
  }

  public List<NotificationDtoOut> getAllNotifications(Integer page, Integer size) {

    PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdDate"));
    List<Notification> notifications = notificationRepo.findAllByNotifyingUserId(getUser().getId(), pageRequest);
    return notifications.stream()
      .map(n -> mapper.map(n, NotificationDtoOut.class))
      .toList();
  }

  public List<NotificationDtoOut> getActiveNotifications(Integer page, Integer size) {
    return getAllNotifications(page, size).stream().filter(NotificationDtoOut::isActive).toList();
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

}
