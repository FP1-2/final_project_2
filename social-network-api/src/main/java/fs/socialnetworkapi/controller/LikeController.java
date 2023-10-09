package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.service.LikeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/likes")
public class LikeController {
  private final LikeService likeService;

  @PostMapping("/like/{postId}/{userId}")
  public void likePost(@PathVariable Long postId, @PathVariable Long userId) {
    likeService.likePost(postId, userId);
  }

}
