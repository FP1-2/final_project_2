package fs.socialnetworkapi.service;

import fs.socialnetworkapi.entity.Like;
import fs.socialnetworkapi.entity.Post;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.exception.PostNotFoundException;
import fs.socialnetworkapi.exception.UserNotFoundException;
import fs.socialnetworkapi.repos.LikeRepo;
import fs.socialnetworkapi.repos.PostRepo;
import fs.socialnetworkapi.repos.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class LikeService {

  private final LikeRepo likeRepo;
  private final UserRepo userRepo;
  private final PostRepo postRepo;

  public List<Like> getLikesForUser(Long userId) {
    return likeRepo.findByUserId(userId);
  }

  public String likePost(Long postId, Long userId) {
    User user = userRepo.findById(userId)
            .orElseThrow(() -> new UserNotFoundException("No such user"));
    Post post = postRepo.findById(postId)
            .orElseThrow(() -> new PostNotFoundException("No such post"));

    Optional<Like> like = likeRepo.findByPostIdAndUserId(postId, userId);
    if (like.isPresent()) {
      likeRepo.delete(like.get());
      return "Unliked";
    } else {
      likeRepo.save(new Like(user, post));
      return "Liked";
    }
  }

}
