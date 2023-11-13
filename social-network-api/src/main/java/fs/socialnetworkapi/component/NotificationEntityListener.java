package fs.socialnetworkapi.component;

import fs.socialnetworkapi.entity.Like;
import fs.socialnetworkapi.entity.Message;
import fs.socialnetworkapi.entity.Post;
import fs.socialnetworkapi.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PreRemove;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class NotificationEntityListener {

  private static final Logger logger = LoggerFactory.getLogger(NotificationEntityListener.class);

  @PersistenceContext
  private EntityManager entityManager;

  @PreRemove
  public void preRemove(Object entity) {
    if (entity instanceof User) {
      handleUserRemove((User) entity);
    } else if (entity instanceof Post) {
      handlePostRemove((Post) entity);
    } else if (entity instanceof Message) {
      handleMessageRemove((Message) entity);
    } else if (entity instanceof Like) {
      handleLikeRemove((Like) entity);
    }
  }

  private void handleUserRemove(User user) {
    if (user.getId() != null) {
      entityManager.createQuery("DELETE FROM Notification n WHERE n.user.id = :userId OR n.notifyingUser.id = :userId")
        .setParameter("userId", user.getId())
        .executeUpdate();
    }
  }

  private void handlePostRemove(Post post) {
    if (post.getId() != null) {
      entityManager.createQuery("DELETE FROM Notification n WHERE n.post.id = :postId")
        .setParameter("postId", post.getId())
        .executeUpdate();
    }
  }

  private void handleMessageRemove(Message message) {
    if (message.getId() != null) {
      entityManager.createQuery("DELETE FROM Notification n WHERE n.message.id = :messageId")
        .setParameter("messageId", message.getId())
        .executeUpdate();
    }
  }

  private void handleLikeRemove(Like like) {
    entityManager.createQuery("DELETE FROM Notification n WHERE n.user.id = :userId AND n.post.id = :postId AND n.type = :type")
      .setParameter("userId", like.getUser().getId())
      .setParameter("postId", like.getPost().getId())
      .setParameter("type", 0)
      .executeUpdate();
  }
}
