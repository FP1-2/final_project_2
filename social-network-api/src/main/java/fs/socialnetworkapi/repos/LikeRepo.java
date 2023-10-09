package fs.socialnetworkapi.repos;

import fs.socialnetworkapi.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepo extends JpaRepository<Like, Long> {
  List<Like> findByUserId(Long userId);

  Optional<Like> findByPostIdAndUserId(Long postId, Long userId);

  List<Like> findByPostId(Long postId);

}
