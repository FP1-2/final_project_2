package fs.socialnetworkapi.repos;


import fs.socialnetworkapi.entity.Like;
import fs.socialnetworkapi.entity.Post;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.enums.TypePost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepo extends JpaRepository<Post, Long> {

  Page<Post> findByUserInAndTypePost(List<User> users, TypePost typePost, Pageable pageable);

  Page<Post> findByUserAndTypePost(User user, TypePost typePost, Pageable pageable);

  Page<Post> findByUser(User user, Pageable pageable);

  List<Post> findByOriginalPostIn(List<Post> posts);

  List<Post> findByOriginalPost(Post originalPost);

  Page<Post> findByOriginalPostAndTypePost(Post post, TypePost comment, Pageable pageRequest);

  Page<Post> findByTypePost(TypePost post, Pageable pageRequest);

  List<Post> findByLikesIn(List<Like> likes);

  Optional<Post> findByUserAndOriginalPostAndTypePost(User user, Post originalPost, TypePost typePost);

  @Query("SELECT p FROM Post p JOIN FETCH p.user WHERE p.id = :postId")
  Post findPostWithUser(@Param("postId") Long postId);

}
