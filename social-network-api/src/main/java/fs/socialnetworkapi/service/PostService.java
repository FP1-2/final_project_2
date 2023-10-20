package fs.socialnetworkapi.service;

import fs.socialnetworkapi.dto.post.PostDtoIn;
import fs.socialnetworkapi.dto.post.PostDtoOut;
import fs.socialnetworkapi.entity.Post;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.enums.TypePost;
import fs.socialnetworkapi.exception.PostNotFoundException;
import fs.socialnetworkapi.repos.PostRepo;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PostService {

  private final PostRepo postRepo;
  private final ModelMapper mapper;
  private final LikeService likeService;

  public PostDtoOut findById(Long postId) {

    return mapper.map(postRepo.findById(postId)
            .orElseThrow(() -> new PostNotFoundException("No such post")),PostDtoOut.class);
  }

  public List<PostDtoOut> findByIds(List<Long> postIds) {
    return postIds.stream().map(this::findById).toList();
  }

  public List<PostDtoOut> findLikedPostsByUserId(Long userId) {
    return likeService.getLikesForUser(userId)
            .stream()
            .map(like -> mapper.map(like.getPost(),PostDtoOut.class))
            .toList();
  }

  public List<PostDtoOut> getAllPost(Integer page, Integer size) {

    PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdDate"));
    return postRepo.findByTypePost(TypePost.POST, pageRequest)
            .stream()
            .map(p -> mapper.map(p,PostDtoOut.class))
            .peek(postDtoOut -> postDtoOut.setComments(List.of()))
            .toList();
  }

  public List<PostDtoOut> getProfilePosts(Integer page, Integer size) {

    User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdDate"));

    return postRepo.findByUser(user, pageRequest)
            .stream()
            .map(p -> mapper.map(p, PostDtoOut.class))
            .peek(postDtoOut -> postDtoOut.setComments(List.of()))
            .toList();
  }

  public List<PostDtoOut> getFollowingsPosts(Integer page, Integer size) {

    User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    Set<User> followings = user.getFollowings();
    List<User> users = followings.stream().sorted((user1, user2) -> (int) (user1.getId() - user2.getId())).toList();
    PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdDate"));

    return postRepo.findByUserInAndTypePost(users, TypePost.POST, pageRequest)
            .stream()
            .map(post -> mapper.map(post, PostDtoOut.class))
            .toList();
  }

  public PostDtoOut savePost(PostDtoIn postDtoIn) {

    User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    Post post = mapper.map(postDtoIn, Post.class);
    post.setUser(user);
    post.setTypePost(TypePost.POST);
    return mapper.map(postRepo.save(post), PostDtoOut.class);
  }

  public void deletePost(Long postId) {

    postRepo.deleteById(postId);
  }

  public PostDtoOut editePost(PostDtoIn postDtoIn) {

    Post post = postRepo.findById(postDtoIn.getId())
            .orElseThrow(() -> new PostNotFoundException(String.format("Post with id: %d not found", postDtoIn.getId())));

    post.setDescription(postDtoIn.getDescription());
    post.setPhoto(postDtoIn.getPhoto());
    return mapper.map(postRepo.save(post), PostDtoOut.class);
  }

  public PostDtoOut saveByType(Long originalPostId, PostDtoIn postDtoIn, TypePost typePost) {

    User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    Post originalPost = postRepo.findById(originalPostId)
            .orElseThrow(() -> new PostNotFoundException(
                    String.format("Original post with id: %d not found", originalPostId)));

    Post post = mapper.map(postDtoIn, Post.class);
    post.setUser(user);
    post.setTypePost(typePost);
    post.setOriginalPost(originalPost);

    return mapper.map(postRepo.save(post), PostDtoOut.class);
  }

  public PostDtoOut getPostById(Long postId) {
    Post post = postRepo.findById(postId)
            .orElseThrow(() -> new PostNotFoundException(String.format("Post with id: %d not found", postId)));
    return mapper.map(post, PostDtoOut.class);
  }
}
