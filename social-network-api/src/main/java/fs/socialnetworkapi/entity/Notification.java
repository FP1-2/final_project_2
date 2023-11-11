package fs.socialnetworkapi.entity;

import fs.socialnetworkapi.enums.NotificationType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Objects;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name = "notifications")
public class Notification extends AbstractEntity {

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "post_id")
  private Post post;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "message_id")
  private Message message;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "notifying_user_id")
  private User notifyingUser;

  private String text;
  private NotificationType type;
  private String link;
  private boolean active = true;

  @Override
  public boolean equals(Object obj) {
    if (this == obj) {
      return true;
    }
    if (obj == null || getClass() != obj.getClass()) {
      return false;
    }
    Notification that = (Notification) obj;
    return active == that.active
      && Objects.equals(user, that.user)
      && Objects.equals(post, that.post)
      && Objects.equals(message, that.message)
      && Objects.equals(notifyingUser, that.notifyingUser)
      && Objects.equals(text, that.text)
      && type == that.type
      && Objects.equals(link, that.link);
  }

  @Override
  public int hashCode() {
    return Objects.hash(user, post, message, notifyingUser, text, type, link, active);
  }

}
