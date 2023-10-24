package fs.socialnetworkapi.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
public class ChatUserKey implements Serializable {

  @Column(name = "user_id")
  long userId;

  @Column(name = "chat_id")
  long chatId;

  public ChatUserKey(Long userId, Long chatId) {
    this.userId = userId;
    this.chatId = chatId;
  }

  public ChatUserKey() {
  }
}
