package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.dto.post.PostDtoOut;
import fs.socialnetworkapi.service.LikeService;
import fs.socialnetworkapi.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/likes")
public class LikeController {

  @Autowired
  private final LikeService likeService;
  @Autowired
  private final PostService postService;

  @GetMapping("/post/{postId}")
  public PostDtoOut getLikesForPost(@PathVariable Long postId) {
    return postService.findById(postId);
  }

  @GetMapping("/posts")
  public List<PostDtoOut> getLikesForPosts(@RequestParam List<Long> postIds) {
    return postService.findByIds(postIds);
  }

  @GetMapping("/user/{userId}")
  public List<PostDtoOut> getLikedPostsForUser(@PathVariable Long userId) {
    return postService.findLikedPostsByUserId(userId);
  }

  @PostMapping("/like/{postId}/{userId}")
  public void likePost(@PathVariable Long postId, @PathVariable Long userId) {
    likeService.likePost(postId, userId);
  }

}
