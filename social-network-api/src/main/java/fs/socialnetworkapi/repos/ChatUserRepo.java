package fs.socialnetworkapi.repos;

import fs.socialnetworkapi.entity.Chat;
import fs.socialnetworkapi.entity.ChatUser;
import fs.socialnetworkapi.entity.ChatUserKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatUserRepo extends JpaRepository<ChatUser, ChatUserKey> {


  Optional<ChatUser> findByChatId(Long chatId);
}
