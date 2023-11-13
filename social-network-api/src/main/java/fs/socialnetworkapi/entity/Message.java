package fs.socialnetworkapi.entity;

import fs.socialnetworkapi.component.NotificationEntityListener;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.EntityListeners;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "messages")
@EntityListeners(NotificationEntityListener.class)
public class Message extends AbstractEntity{

  private String text;

  @ManyToOne
  private User user;
  @ManyToOne
  private Chat chat;

  @Override
  public boolean equals(Object obj) {
    if (this == obj) {
      return true;
    }
    if (obj == null || getClass() != obj.getClass()) {
      return false;
    }
    Message chat = (Message) obj;
    return Objects.equals(this.getId(), chat.getId());
  }

  @Override
  public int hashCode() {
    return Objects.hash(this.getId());
  }
}
