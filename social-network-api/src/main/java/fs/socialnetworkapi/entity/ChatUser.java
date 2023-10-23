package fs.socialnetworkapi.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.IdClass;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.JoinColumn;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Entity
@Getter
@Setter
@NoArgsConstructor
@IdClass(ChatUserKey.class)
public class ChatUser {

  @Id
  private long userId;
  @Id
  private long chatId;

  @ManyToOne
  @MapsId("userId")
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne
  @MapsId("chatId")
  @JoinColumn(name = "chat_id")
  private Chat chat;

  public ChatUser(long userId, long chatId) {
    this.userId = userId;
    this.chatId = chatId;
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) {
      return true;
    }
    if (obj == null || getClass() != obj.getClass()) {
      return false;
    }
    ChatUser chatUser = (ChatUser) obj;
    return userId == chatUser.userId && chatId == chatUser.chatId;
  }

  @Override
  public int hashCode() {
    return Objects.hash(userId, chatId);
  }

}
