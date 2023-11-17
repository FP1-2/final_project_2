package fs.socialnetworkapi.component;

import fs.socialnetworkapi.dto.user.UserDtoOut;
import fs.socialnetworkapi.entity.Like;
import fs.socialnetworkapi.entity.Notification;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.entity.Post;
import fs.socialnetworkapi.entity.Message;
import fs.socialnetworkapi.entity.ChatUser;
import fs.socialnetworkapi.enums.NotificationType;
import fs.socialnetworkapi.enums.TypePost;
import fs.socialnetworkapi.service.NotificationService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
@NoArgsConstructor
public class NotificationCreator {

  @Autowired
  private ModelMapper mapper;

  @Autowired
  private NotificationService notificationService;

  @Value("${myapp.baseUrl}")
  private String baseUrl;

  public void likeNotification(Like like) {
    if (like.getUser().equals(like.getPost().getUser())) {
      return;
    }
    Notification notification = new Notification();
    notification.setFromUser(like.getUser());
    notification.setType(NotificationType.LIKE);
    notification.setLink(String.format("%s/#/post/%d", baseUrl, like.getPost().getId()));
    notification.setText(String.format("User %s liked your post", like.getUser().getUsername()));
    notification.setNotifyingUser(like.getPost().getUser());
    notificationService.createNewNotification(notification);
  }

  public void sendPostNotification(Post postToSave, TypePost typePost, List<UserDtoOut> followers) {
    if (typePost.equals(TypePost.POST)) {
      featuredNotification(postToSave, followers);
    } else if (postToSave.getOriginalPost() != null
      && postToSave.getUser().equals(postToSave.getOriginalPost().getUser())) {
      return;
    }
    if (typePost.equals(TypePost.REPOST)) {
      repostNotification(postToSave);
    }
    if (typePost.equals(TypePost.COMMENT)) {
      commentNotification(postToSave);
    }
  }

  public void featuredNotification(Post post, List<UserDtoOut> followers) {
    String link = String.format("%s/#/post/%d", baseUrl, post.getId());
    String text = String.format("Your featured user %s has new post", post.getUser().getUsername());

    followers.forEach(user -> {
      Notification notification = new Notification();
      notification.setFromUser(post.getUser());
      notification.setType(NotificationType.FEATURED);
      notification.setLink(link);
      notification.setText(text);
      notification.setNotifyingUser(mapper.map(user, User.class));
      notificationService.createNewNotification(notification);
    });
  }

  public void repostNotification(Post post) {
    Notification notification = new Notification();
    notification.setFromUser(post.getUser());
    notification.setType(NotificationType.REPOST);
    notification.setLink(String.format("%s/#/post/%d", baseUrl, post.getId()));
    notification.setText(String.format("User %s reposted your post", post.getUser().getUsername()));
    notification.setNotifyingUser(post.getOriginalPost().getUser());
    notificationService.createNewNotification(notification);
  }

  public void commentNotification(Post post) {
    Notification notification = new Notification();
    notification.setFromUser(post.getUser());
    notification.setType(NotificationType.COMMENT);
    notification.setLink(String.format("%s/#/post/%d", baseUrl, post.getId()));
    notification.setText(String.format("User %s commented your post", post.getUser().getUsername()));
    notification.setNotifyingUser(post.getOriginalPost().getUser());
    notificationService.createNewNotification(notification);
  }

  public void subscriberNotification(User follower, User following) {
    Notification notification = new Notification();
    notification.setFromUser(follower);
    notification.setType(NotificationType.SUBSCRIBER);
    notification.setLink(String.format("%s/#/profile/%d", baseUrl, follower.getId()));
    notification.setText(String.format("User %s subscribed to your account", follower.getUsername()));
    notification.setNotifyingUser(following);
    notificationService.createNewNotification(notification);
  }

  public void messageNotification(Message message) {
    String link = String.format("%s/#/messages", baseUrl);
    String text = String.format("User %s sent you new message", message.getUser().getUsername());

    message.getChat()
      .getChatUsers()
      .stream()
      .map(ChatUser::getUser)
      .filter(user -> !user.equals(message.getUser()))
      .forEach(
        user -> {
          Notification notification = new Notification();
          notification.setFromUser(message.getUser());
          notification.setType(NotificationType.MESSAGE);
          notification.setLink(link);
          notification.setText(text);
          notification.setNotifyingUser(user);
          notificationService.createNewNotification(notification);
        }
      );
  }

}
