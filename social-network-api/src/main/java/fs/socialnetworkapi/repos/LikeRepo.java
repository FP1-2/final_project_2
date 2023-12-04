package fs.socialnetworkapi.repos;

import fs.socialnetworkapi.entity.Like;
import fs.socialnetworkapi.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepo extends JpaRepository<Like, Long> {
  List<Like> findByUserId(Long userId);

  Page<Like> findByUserId(Long userId, Pageable pageRequest);

  Optional<Like> findByPostIdAndUserId(Long postId, Long userId);

  List<Like> findByPostId(Long postId);

  List<Like> findByPostIn(List<Post> posts);
}
