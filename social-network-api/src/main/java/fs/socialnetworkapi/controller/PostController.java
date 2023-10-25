package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.dto.post.PostDtoIn;
import fs.socialnetworkapi.dto.post.PostDtoOut;
import fs.socialnetworkapi.enums.TypePost;
import fs.socialnetworkapi.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/")
public class PostController {

  private final PostService postService;

  @GetMapping("all-posts")
  public ResponseEntity<List<PostDtoOut>> getAllPosts(
          @RequestParam(value = "page", defaultValue = "0") Integer page,
          @RequestParam(value = "size", defaultValue = "10") Integer size) {
    List<PostDtoOut> allPosts = postService.getAllPost(page, size);
    return ResponseEntity.ok(allPosts);
  }

  @GetMapping("profile-posts/{user_id}")
  public ResponseEntity<List<PostDtoOut>> getUserPosts(@RequestParam(value = "user_id") Long userId,
                                                       @RequestParam(value = "page", defaultValue = "0") Integer page,
                                                      @RequestParam(value = "size", defaultValue = "10") Integer size) {
    List<PostDtoOut> allPosts = postService.getProfilePosts(userId, page, size);
    return ResponseEntity.ok(allPosts);
  }

  @GetMapping("followings-posts")
  public ResponseEntity<List<PostDtoOut>> getFollowingsPosts(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                                      @RequestParam(value = "size", defaultValue = "10") Integer size) {
    List<PostDtoOut> allPosts = postService.getFollowingsPosts(page, size);
    return ResponseEntity.ok(allPosts);
  }

  @PostMapping("post")
  public ResponseEntity<PostDtoOut> addPost(@Valid @RequestBody PostDtoIn postDtoIn) {
    PostDtoOut postDtoOut = postService.savePost(postDtoIn);
    return ResponseEntity.ok(postDtoOut);
  }

  @PostMapping("post/{original_post_id}/repost")
  public ResponseEntity<PostDtoOut> addRepost(@PathVariable("original_post_id") Long originalPostId,
                                              @RequestBody PostDtoIn postDtoIn) {
    PostDtoOut postDtoOut = postService.saveByType(originalPostId, postDtoIn, TypePost.REPOST);
    return ResponseEntity.ok(postDtoOut);
  }

  @PostMapping("post/{original_post_id}/comment")
  public ResponseEntity<PostDtoOut> addComment(@PathVariable("original_post_id") Long originalPostId,
                                            @Valid @RequestBody PostDtoIn postDtoIn) {
    PostDtoOut postDtoOut = postService.saveByType( originalPostId, postDtoIn, TypePost.COMMENT);
    return ResponseEntity.ok(postDtoOut);
  }

  @DeleteMapping("post/{post_id}")
  public ResponseEntity<?> deletePost(@PathVariable("post_id") Long postId) {
    postService.deletePost(postId);
    return ResponseEntity.ok().build();
  }

  @PutMapping("post")
  public ResponseEntity<PostDtoOut> editePost(@Valid @RequestBody PostDtoIn postDtoIn) {
    PostDtoOut postDtoOut = postService.editePost(postDtoIn);
    return ResponseEntity.ok(postDtoOut);
  }

  @GetMapping("post/{post_id}")
  public ResponseEntity<PostDtoOut> getPost(@PathVariable("post_id") Long postId) {
    PostDtoOut post = postService.getPostById(postId);
    return ResponseEntity.ok(post);
  }


}
