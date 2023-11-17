package fs.socialnetworkapi.repos;

import fs.socialnetworkapi.entity.Notification;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepo extends JpaRepository<Notification, Long> {

  List<Notification> findAllByNotifyingUserId(Long notifyingUserId, PageRequest pageRequest);

  List<Notification> findAllByNotifyingUserId(Long notifyingUserId);

}
