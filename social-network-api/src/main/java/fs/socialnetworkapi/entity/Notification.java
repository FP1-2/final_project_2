package fs.socialnetworkapi.entity;

import fs.socialnetworkapi.enums.NotificationType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name = "notifications")
public class Notification extends AbstractEntity {

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne
  @JoinColumn(name = "post_id")
  private Post post;

  @ManyToOne
  @JoinColumn(name = "message_id")
  private Message message;

  @ManyToOne
  @JoinColumn(name = "notifying_user_id")
  private User notifyingUser;

  private String text;
  private NotificationType type;
  private String link;
  private boolean active = true;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Notification that = (Notification) o;
    return active == that.active &&
      Objects.equals(user, that.user) &&
      Objects.equals(post, that.post) &&
      Objects.equals(message, that.message) &&
      Objects.equals(notifyingUser, that.notifyingUser) &&
      Objects.equals(text, that.text) &&
      type == that.type &&
      Objects.equals(link, that.link);
  }

  @Override
  public int hashCode() {
    return Objects.hash(user, post, message, notifyingUser, text, type, link, active);
  }

}
