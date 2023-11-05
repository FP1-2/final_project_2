package fs.socialnetworkapi.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Table;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "chats")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Chat extends AbstractEntity{

  private String name;
  @OneToMany(mappedBy = "chat",fetch = FetchType.EAGER)
  List<ChatUser> chatUsers;
  @OneToMany(mappedBy = "chat")
  List<Message> messages;

  @Override
  public boolean equals(Object obj) {
    if (this == obj) {
      return true;
    }
    if (obj == null || getClass() != obj.getClass()) {
      return false;
    }
    Chat chat = (Chat) obj;
    return Objects.equals(this.getId(), chat.getId());
  }

  @Override
  public int hashCode() {
    return Objects.hash(this.getId());
  }
}
