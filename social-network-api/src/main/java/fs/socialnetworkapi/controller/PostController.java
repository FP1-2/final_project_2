package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.dto.post.PostDtoIn;
import fs.socialnetworkapi.dto.post.PostDtoOut;
import fs.socialnetworkapi.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/")
public class PostController {

    private final PostService postService;

    @GetMapping("user/{user_id}/posts")
    public ResponseEntity<List<PostDtoOut>> getAllPosts(@PathVariable("user_id") Long idUser,
                                                        @RequestParam(value = "page",defaultValue = "0") Integer page,
                                                        @RequestParam(value = "size",defaultValue = "10") Integer size){
        List<PostDtoOut> allPosts = postService.getAllPosts(idUser, page, size);
        return ResponseEntity.ok(allPosts);
    }
    @PostMapping("user/{user_id}/post")
    public ResponseEntity<PostDtoOut> addPost(@PathVariable("user_id") Long idUser,
                                              @Valid @RequestBody PostDtoIn postDtoIn){
        PostDtoOut postDtoOut = postService.save(idUser, postDtoIn);
        return ResponseEntity.ok(postDtoOut);
    }

    @DeleteMapping("user/{user_id}/post/{post_id}")
    public ResponseEntity<?> removePost(@PathVariable("user_id") Long idUser,
                                        @PathVariable("post_id") Long idPost){
        postService.deletePost(idUser, idPost);
        return ResponseEntity.ok().build();
    }

    @PutMapping("user/{user_id}/post")
    public ResponseEntity<PostDtoOut> editePost(@PathVariable("user_id") Long idUser,
                                                @Valid @RequestBody PostDtoIn postDtoIn){
        PostDtoOut postDtoOut = postService.editePost(postDtoIn);
        return ResponseEntity.ok(postDtoOut);
    }

}
