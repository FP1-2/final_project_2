package fs.socialnetworkapi.service;

import fs.socialnetworkapi.component.NotificationCreator;
import fs.socialnetworkapi.dto.post.PostDtoOut;
import fs.socialnetworkapi.entity.Like;
import fs.socialnetworkapi.entity.Post;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.exception.UserNotFoundException;
import fs.socialnetworkapi.repos.LikeRepo;
import fs.socialnetworkapi.repos.PostRepo;
import fs.socialnetworkapi.repos.UserRepo;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class LikeService {

  private final LikeRepo likeRepo;
  private final PostRepo postRepo;
  private final UserRepo userRepo;
  private final ModelMapper mapper;

  @Autowired
  private final NotificationCreator notificationCreator;

  private User getUser() {
    return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }

  private void sendLikeNotification(Like like) {
    notificationCreator.likeNotification(like);
  }

  public List<PostDtoOut> getLikesForUser() {
    User user = getUser();
    return likeRepo.findByUserId(user.getId())
      .stream()
      .map(Like::getPost)
      .map(post -> mapper.map(post, PostDtoOut.class))
      .toList();
  }

  public String likePost(Long postId) {
    User user = getUser();
    User current = userRepo.findById(user.getId())
      .orElseThrow(() -> new UserNotFoundException("No such user"));
    Post post = postRepo.findPostWithUser(postId);
    Optional<Like> like = likeRepo.findByPostIdAndUserId(postId, user.getId());
    if (like.isPresent()) {
      likeRepo.delete(like.get());
      return "Unliked";
    } else {
      sendLikeNotification(likeRepo.save(new Like(current, post)));
      return "Liked";
    }
  }

  public List<Like> findByPostId(Long postId) {
    return likeRepo.findByPostId(postId);
  }

  public List<Like> findByPostIn(List<Post> posts) {
    return likeRepo.findByPostIn(posts);
  }

  public List<Like> findByUserId(Long userId) {
    return likeRepo.findByUserId(userId);
  }

  public List<Like> findByUserId(Long userId, Integer page, Integer size) {
    Pageable pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdDate"));

    return likeRepo.findByUserId(userId, pageRequest)
            .stream()
            .toList();
  }

}
