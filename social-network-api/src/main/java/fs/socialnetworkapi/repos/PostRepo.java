package fs.socialnetworkapi.repos;

import fs.socialnetworkapi.entity.Post;
import fs.socialnetworkapi.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepo extends JpaRepository<Post, Long> {

  Page<Post> findByUserIn(List<User> users, Pageable pageable);

  Page<Post> findByUserInOrIdIn(List<User> users, List<Long> id, Pageable pageable);

  Page<Post> findAll(Pageable pageable);
}
