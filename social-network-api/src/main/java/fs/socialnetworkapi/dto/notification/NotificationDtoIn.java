package fs.socialnetworkapi.dto.notification;

import fs.socialnetworkapi.entity.Message;
import fs.socialnetworkapi.entity.Post;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.enums.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NotificationDtoIn {

  private User user;
  private Post post;
  private Message message;
  private User notifyingUser;
  private NotificationType type;

}
