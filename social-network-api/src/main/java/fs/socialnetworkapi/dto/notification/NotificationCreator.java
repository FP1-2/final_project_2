package fs.socialnetworkapi.dto.notification;

import fs.socialnetworkapi.entity.*;
import fs.socialnetworkapi.enums.NotificationType;
import fs.socialnetworkapi.service.NotificationService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
public class NotificationCreator {
  private ModelMapper mapper;
  private NotificationService notificationService;
  private NotificationDtoIn notificationDtoIn;

  @Value("${myapp.baseUrl}")
  private String baseUrl;

  private User getUser() {
    return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }

  private String fromUser(){
    return notificationDtoIn.getUser().getUsername();
  }

  private String post(){
    return notificationDtoIn.getPost().getDescription();
  }

  private String message(){
    return notificationDtoIn.getMessage().getText();
  }

  public Notification likeNotification(Like like) {
    this.notificationDtoIn = new NotificationDtoIn(
      like.getUser(),
      like.getPost(),
      null,
      like.getPost().getUser(),
      NotificationType.LIKE,
      String.format("%s/api/v1/%d", baseUrl, like.getPost().getId())
    );
    return createNewNotification();
  }

  public Notification commentNotification(Post post) {
    this.notificationDtoIn = new NotificationDtoIn(
      post.getUser(),
      post,
      null,
      post.getOriginalPost().getUser(),
      NotificationType.COMMENT,
      String.format("%s/api/v1/%d", baseUrl, post.getId())
    );
    return createNewNotification();
  }

  public Notification repostNotification(Post post) {
    this.notificationDtoIn = new NotificationDtoIn(
      post.getUser(),
      post,
      null,
      post.getOriginalPost().getUser(),
      NotificationType.REPOST,
      String.format("%s/api/v1/%d", baseUrl, post.getId())
    );
    return createNewNotification();
  }

  public Notification subscriberNotification(User user) {
    this.notificationDtoIn = new NotificationDtoIn(
      getUser(),
      null,
      null,
      user,
      NotificationType.SUBSCRIBER,
      String.format("%s/api/v1/user/info/%d", baseUrl, user.getId())
    );
    return createNewNotification();
  }

  public List<Notification> featuredNotification(Post post) {
    return post.getUser()
      .getFollowers()
      .stream()
      .map(
        user -> {
          this.notificationDtoIn = new NotificationDtoIn(
            post.getUser(),
            post,
            null,
            user,
            NotificationType.FEATURED,
            String.format("%s/api/v1/%d", baseUrl, post.getId())
          );
          return createNewNotification();
        }
      ).toList();
  }

  public List<Notification> messageNotification(Message message) {
    return message.getChat()
      .getChatUsers()
      .stream()
      .map(ChatUser::getUser)
      .filter(user -> !user.equals(message.getUser()))
      .map(
        user -> {
          this.notificationDtoIn = new NotificationDtoIn(
            message.getUser(),
            null,
            message,
            user,
            NotificationType.MESSAGE,
            String.format("%s/api/v1/get-messages-chat/%d", baseUrl, message.getChat().getId())
          );
          return createNewNotification();
        }
      ).toList();
  }

  private String createMessage() {
    return switch (notificationDtoIn.getType()) {
      case LIKE -> String.format("User %s liked your post %s", fromUser(), post());
      case COMMENT -> String.format("User %s commented your post: %s", fromUser(), post());
      case REPOST -> String.format("User %s reposted your post: %s", fromUser(), post());
      case SUBSCRIBER -> String.format("User %s subscribed to your account", fromUser());
      case FEATURED -> String.format("Your featured user %s has new post: %s", fromUser(), post());
      case MESSAGE -> String.format("User %s sent you new message: %s", fromUser(), message());
    };
  }

  private Notification createNewNotification() {
    Notification notification = mapper.map(notificationDtoIn, Notification.class);
    notification.setText(createMessage());
    return notificationService.createNewNotification(notification);
  }

}
