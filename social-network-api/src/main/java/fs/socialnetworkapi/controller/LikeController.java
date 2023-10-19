package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.service.LikeService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/likes")
public class LikeController {
  private final LikeService likeService;

  @PostMapping("/like/{postId}")
  public ResponseEntity<String> likePost(@PathVariable Long postId) {
    try {
      String result = likeService.likePost(postId);
      return ResponseEntity.ok(String.format("%s successfully", result));
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(String.format("Failed: %s", e));
    }
  }

}
