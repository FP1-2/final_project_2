package fs.socialnetworkapi.repos;

import fs.socialnetworkapi.entity.Chat;
import fs.socialnetworkapi.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepo extends JpaRepository<Message, Long> {
  Page<Message> findByChat(Chat chat, Pageable pageRequest);
}
