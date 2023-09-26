package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.entity.Like;
import fs.socialnetworkapi.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/likes")
public class LikeController {

  @Autowired
  private final LikeService likeService;

  @GetMapping("/post/{postId}")
  public List<Like> getLikesForPost(@PathVariable Long postId) {
    return likeService.getLikesForPost(postId);
  }

  @GetMapping("/user/{userId}")
  public List<Like> getLikesForUser(@PathVariable Long userId) {
    return likeService.getLikesForUser(userId);
  }

  @PostMapping("/like/{postId}/{userId}")
  public void likePost(@PathVariable Long postId, @PathVariable Long userId) {
    likeService.likePost(postId, userId);
  }

}
