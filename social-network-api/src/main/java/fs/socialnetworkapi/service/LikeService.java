package fs.socialnetworkapi.service;

import fs.socialnetworkapi.entity.Like;
import fs.socialnetworkapi.entity.Post;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.exception.PostNotFoundException;
import fs.socialnetworkapi.repos.LikeRepo;
import fs.socialnetworkapi.repos.PostRepo;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class LikeService {

  private final LikeRepo likeRepo;
  private final PostRepo postRepo;

  public List<Like> getLikesForUser(Long userId) {
    return likeRepo.findByUserId(userId);
  }

  public String likePost(Long postId) {
    User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    Post post = postRepo.findById(postId)
            .orElseThrow(() -> new PostNotFoundException("No such post"));

    Optional<Like> like = likeRepo.findByPostIdAndUserId(postId, user.getId());
    if (like.isPresent()) {
      likeRepo.delete(like.get());
      return "Unliked";
    } else {
      likeRepo.save(new Like(user, post));
      return "Liked";
    }
  }

}
