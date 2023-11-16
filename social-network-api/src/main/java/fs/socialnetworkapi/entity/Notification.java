package fs.socialnetworkapi.entity;

import fs.socialnetworkapi.enums.NotificationType;
import jakarta.persistence.FetchType;
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

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "notifying_user_id")
  private User notifyingUser;

  private String photo;
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
    return Objects.equals(notifyingUser, that.notifyingUser)
      && Objects.equals(text, that.text)
      && type == that.type
      && Objects.equals(link, that.link);
  }

  @Override
  public int hashCode() {
    return Objects.hash(notifyingUser, text, type, link);
  }

}
