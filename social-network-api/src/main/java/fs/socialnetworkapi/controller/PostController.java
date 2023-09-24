package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.dto.post.PostDtoIn;
import fs.socialnetworkapi.dto.post.PostDtoOut;
import fs.socialnetworkapi.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/")
public class PostController {

  private final PostService postService;

  @GetMapping("user/{user_id}/posts")
  public ResponseEntity<List<PostDtoOut>> getAllPosts(@PathVariable("user_id") Long idUser,
                                                      @RequestParam(value = "page", defaultValue = "0") Integer page,
                                                      @RequestParam(value = "size", defaultValue = "10") Integer size) {
    List<PostDtoOut> allPosts = postService.getAllPosts(idUser, page, size);
    return ResponseEntity.ok(allPosts);
  }

  @GetMapping("user/{user_id}/followings-posts")
  public ResponseEntity<List<PostDtoOut>> getFollowingsPosts(@PathVariable("user_id") Long idUser,
                                                      @RequestParam(value = "page", defaultValue = "0") Integer page,
                                                      @RequestParam(value = "size", defaultValue = "10") Integer size) {
    List<PostDtoOut> allPosts = postService.getFollowingsPosts(idUser, page, size);
    return ResponseEntity.ok(allPosts);
  }

  @PostMapping("user/{user_id}/post")
  public ResponseEntity<PostDtoOut> addPost(@PathVariable("user_id") Long idUser,
                                            @Valid @RequestBody PostDtoIn postDtoIn) {
    PostDtoOut postDtoOut = postService.save(idUser, postDtoIn);
    return ResponseEntity.ok(postDtoOut);
  }

  @DeleteMapping("user/{user_id}/post/{post_id}")
  public ResponseEntity<?> removePost(@PathVariable("user_id") Long idUser,
                                      @PathVariable("post_id") Long idPost) {
    postService.deletePost(idPost);
    return ResponseEntity.ok().build();
  }

  @PutMapping("user/{user_id}/post")
  public ResponseEntity<PostDtoOut> editePost(@PathVariable("user_id") Long idUser,
                                              @Valid @RequestBody PostDtoIn postDtoIn) {
    PostDtoOut postDtoOut = postService.editePost(postDtoIn);
    return ResponseEntity.ok(postDtoOut);
  }

  @PostMapping("user/{user_id}/post/{post_id}/repost")
  public ResponseEntity<PostDtoOut> addRepost(@PathVariable("user_id") Long idUser,
                                              @PathVariable("post_id") Long idPost) {
    PostDtoOut postDtoOut = postService.saveRepost(idUser, idPost);
    return ResponseEntity.ok(postDtoOut);
  }

}
