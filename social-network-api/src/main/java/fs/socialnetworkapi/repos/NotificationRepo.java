package fs.socialnetworkapi.repos;

import fs.socialnetworkapi.entity.Notification;
import fs.socialnetworkapi.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepo extends JpaRepository<Notification, Long> {

  List<Notification> findAllByNotifyingUserId(Long notifyingUserId);

  @Modifying
  @Query(value = "delete from notifications where id = :id",nativeQuery = true)
  void deleteNotificationByPostId(@Param("id") Long id);

  void deleteAllByUserId(Long userId);

  void deleteAllByMessageId(Long messageId);

  List<Notification> findByPost(Post post);
}
