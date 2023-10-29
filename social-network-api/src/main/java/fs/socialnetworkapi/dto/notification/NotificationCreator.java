package fs.socialnetworkapi.dto.notification;

import fs.socialnetworkapi.entity.Like;
import fs.socialnetworkapi.entity.Notification;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.entity.Post;
import fs.socialnetworkapi.entity.Message;
import fs.socialnetworkapi.entity.ChatUser;
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
  private String text;
  private String link;

  @Value("${myapp.baseUrl}")
  private String baseUrl;

  private User getUser() {
    return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }

  private String fromUser() {
    return notificationDtoIn.getUser().getUsername();
  }

  private String post() {
    return notificationDtoIn.getPost().getDescription();
  }

  private String message() {
    return notificationDtoIn.getMessage().getText();
  }

  public Notification likeNotification(Like like) {
    this.notificationDtoIn = new NotificationDtoIn(
      like.getUser(),
      like.getPost(),
      null,
      like.getPost().getUser(),
      NotificationType.LIKE
    );
    link = String.format("%s/api/v1/%d", baseUrl, like.getPost().getId());
    text = String.format("User %s liked your post %s", fromUser(), post());
    return createNewNotification();
  }

  public Notification commentNotification(Post post) {
    this.notificationDtoIn = new NotificationDtoIn(
      post.getUser(),
      post,
      null,
      post.getOriginalPost().getUser(),
      NotificationType.COMMENT
    );
    link = String.format("%s/api/v1/%d", baseUrl, post.getId());
    text = String.format("User %s commented your post: %s", fromUser(), post());
    return createNewNotification();
  }

  public Notification repostNotification(Post post) {
    this.notificationDtoIn = new NotificationDtoIn(
      post.getUser(),
      post,
      null,
      post.getOriginalPost().getUser(),
      NotificationType.REPOST
      );
    link = String.format("%s/api/v1/%d", baseUrl, post.getId());
    text = String.format("User %s reposted your post: %s", fromUser(), post());
    return createNewNotification();
  }

  public Notification subscriberNotification(User user) {
    this.notificationDtoIn = new NotificationDtoIn(
      getUser(),
      null,
      null,
      user,
      NotificationType.SUBSCRIBER
      );
    link = String.format("%s/api/v1/user/info/%d", baseUrl, user.getId());
    text = String.format("User %s subscribed to your account", fromUser());
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
            NotificationType.FEATURED
            );
          link = String.format("%s/api/v1/%d", baseUrl, post.getId());
          text = String.format("Your featured user %s has new post: %s", fromUser(), post());
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
            NotificationType.MESSAGE
            );
          link = String.format("%s/api/v1/get-messages-chat/%d", baseUrl, message.getChat().getId());
          text = String.format("User %s sent you new message: %s", fromUser(), message());
          return createNewNotification();
        }
      ).toList();
  }

  private Notification createNewNotification() {
    Notification notification = mapper.map(notificationDtoIn, Notification.class);
    notification.setText(text);
    notification.setLink(link);
    return notificationService.createNewNotification(notification);
  }

}
