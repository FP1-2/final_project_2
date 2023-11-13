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
import org.springframework.security.core.context.SecurityContextHolder;
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

  private User getUser() {
    return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }

  public void likeNotification(Like like) {
    Notification notification = new Notification();
    notification.setPost(like.getPost());
    notification.setUser(like.getUser());
    notification.setType(NotificationType.LIKE);
    notification.setLink(String.format("%s/#/%d", baseUrl, like.getPost().getId()));
    notification.setText(String.format("User %s liked your post %s",
      notification.getUser().getUsername(),
      notification.getPost().getDescription()));
    notification.setNotifyingUser(like.getPost().getUser());

    notificationService.createNewNotification(notification);
  }

  public void sendPostByTypePost(Post postToSave, TypePost typePost, List<UserDtoOut> followers) {
    if (typePost.equals(TypePost.POST)) {
      featuredNotification(postToSave, followers);
    }
    if (typePost.equals(TypePost.REPOST)) {
      repostNotification(postToSave);
    }
    if (typePost.equals(TypePost.COMMENT)) {
      commentNotification(postToSave);
    }
  }

  public void featuredNotification(Post post, List<UserDtoOut> followers) {
    followers.forEach(user -> {
      Notification notification = new Notification();
      notification.setPost(post);
      notification.setUser(post.getUser());
      notification.setType(NotificationType.FEATURED);
      notification.setLink(String.format("%s/#/%d", baseUrl, post.getId()));
      notification.setText(String.format("Your featured user %s has new post: %s",
        notification.getUser().getUsername(),
        notification.getPost().getDescription()));

      notification.setNotifyingUser(mapper.map(user, User.class));

      notificationService.createNewNotification(notification);
    });
  }

  public void repostNotification(Post post) {

    Notification notification = new Notification();
    notification.setPost(post);
    notification.setUser(post.getUser());
    notification.setType(NotificationType.REPOST);
    notification.setLink(String.format("%s/#/%d", baseUrl, post.getId()));
    notification.setText(String.format("User %s reposted your post: %s",
      notification.getUser().getUsername(),
      notification.getPost().getDescription()));

    notification.setNotifyingUser(post.getOriginalPost().getUser());

    notificationService.createNewNotification(notification);
  }

  public void commentNotification(Post post) {

    Notification notification = new Notification();
    notification.setPost(post);
    notification.setUser(post.getUser());
    notification.setType(NotificationType.REPOST);
    notification.setLink(String.format("%s/#/%d", baseUrl, post.getId()));
    notification.setText(String.format("User %s commented your post: %s",
            notification.getUser().getUsername(),
            notification.getPost().getDescription()));

    notification.setNotifyingUser(post.getOriginalPost().getUser());

    notificationService.createNewNotification(notification);
  }

  public void subscriberNotification(User user) {

    Notification notification = new Notification();
    notification.setUser(getUser());
    notification.setType(NotificationType.SUBSCRIBER);
    notification.setLink(String.format("%s/#/user/info/%d", baseUrl, user.getId()));
    notification.setText(String.format("User %s subscribed to your account", notification.getUser().getUsername()));
    notification.setNotifyingUser(user);

    notificationService.createNewNotification(notification);
  }

  public void messageNotification(Message message) {

    message.getChat()
      .getChatUsers()
      .stream()
      .map(ChatUser::getUser)
      .filter(user -> !user.equals(message.getUser()))
      .forEach(
        user -> {
          Notification notification = new Notification();
          notification.setUser(message.getUser());
          notification.setType(NotificationType.MESSAGE);
          notification.setMessage(message);
          notification.setLink(String.format("%s/#/get-messages-chat/%d",
            baseUrl,
            message.getChat().getId()));
          notification.setText(String.format("User %s sent you new message: %s",
            notification.getUser().getUsername(),
            message.getText()));
          notification.setNotifyingUser(user);

          notificationService.createNewNotification(notification);
        }
      );
  }

  public void deleteByPostId(Long postId) {
    notificationService.deleteByPostId(postId);
  }

  public void deleteByMessageId(Long messageId) {
    notificationService.deleteByMessageId(messageId);
  }
}
