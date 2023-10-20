package fs.socialnetworkapi.repos;


import fs.socialnetworkapi.entity.Post;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.enums.TypePost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepo extends JpaRepository<Post, Long> {

  Page<Post> findByUserInAndTypePost(List<User> users, TypePost typePost, Pageable pageable);

  Page<Post> findByUser(User user, Pageable pageable);

  Optional<Post> findByIdAndUser(Long postId, User user);

  Page<Post> findByOriginalPostAndTypePost(Post post, TypePost comment, PageRequest pageRequest);

  Page<Post> findByTypePost(TypePost post, PageRequest pageRequest);
}
