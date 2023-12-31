package fs.socialnetworkapi.service;

import fs.socialnetworkapi.component.NotificationCreator;
import fs.socialnetworkapi.dto.post.PostDtoIn;
import fs.socialnetworkapi.dto.post.PostDtoOut;
import fs.socialnetworkapi.entity.Like;
import fs.socialnetworkapi.entity.Post;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.enums.TypePost;
import fs.socialnetworkapi.exception.PostNotFoundException;
import fs.socialnetworkapi.repos.PostRepo;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

  private final PostRepo postRepo;
  private final ModelMapper mapper;
  private final LikeService likeService;
  private final UserService userService;

  @Autowired
  private final NotificationCreator notificationCreator;

  public PostDtoOut findById(Long postId) {

    return mapper.map(postRepo.findById(postId)
            .orElseThrow(() -> new PostNotFoundException("No such post")),PostDtoOut.class);
  }

  public List<PostDtoOut> getAllPost(Integer page, Integer size) {

    Pageable pageRequest = getPageRequest(page, size);

    List<Post> allPosts = postRepo.findByTypePost(TypePost.POST, pageRequest).stream().toList();

    return mapListPostToListPostDtoOut(allPosts);

  }

  public List<PostDtoOut> getProfilePosts(Long userId, Integer page, Integer size) {

    User user = userService.findById(userId);

    Pageable pageRequest = getPageRequest(page, size);

    List<Post> allPosts = postRepo.findByUser(user, pageRequest).stream().toList();

    return mapListPostToListPostDtoOut(allPosts);
  }

  public List<PostDtoOut> getProfilePostByType(Long userId, TypePost typePost, Integer page, Integer size ) {
    User user = userService.findById(userId);

    Pageable pageRequest = getPageRequest(page, size);

    List<Post> allPosts = postRepo.findByUserAndTypePost(user, typePost, pageRequest).stream().toList();

    return mapListPostToListPostDtoOut(allPosts);
  }

  public List<PostDtoOut> getFollowingsPosts(Integer page, Integer size) {

    User user = userService.getUser();

    Set<User> followings = userService.getFollowings(user.getId());
    List<User> users = followings.stream().sorted((user1, user2) -> (int) (user1.getId() - user2.getId())).toList();
    Pageable pageRequest = getPageRequest(page, size);

    List<Post> allPosts = postRepo.findByUserInAndTypePost(users, TypePost.POST, pageRequest).stream().toList();

    return mapListPostToListPostDtoOut(allPosts);

  }

  public List<PostDtoOut> getPostByUserLikes(Long userId, Integer page, Integer size) {
    List<Like> likeList = likeService.findByUserId(userId, page, size);
    return findByLikesIn(likeList);

  }

  public List<PostDtoOut> findByLikesIn(List<Like> likes) {
    List<Post> allPosts = postRepo.findByLikesIn(likes);

    return mapListPostToListPostDtoOut(allPosts);
  }

  public PostDtoOut savePost(PostDtoIn postDtoIn) {

    User user = userService.getUser();
    User current = userService.findById(user.getId());

    Post post = mapper.map(postDtoIn, Post.class);
    post.setUser(current);
    post.setTypePost(TypePost.POST);
    Post postToSave = save(post, TypePost.POST);

    return mapper.map(postToSave, PostDtoOut.class);
  }

  public PostDtoOut saveByTypeAndOriginalPost(Long originalPostId, PostDtoIn postDtoIn, TypePost typePost) {

    User user = userService.getUser();
    User current = userService.findById(user.getId());

    Post originalPost = postRepo.findById(originalPostId)
            .orElseThrow(() -> new PostNotFoundException(
                    String.format("Original post with id: %d not found", originalPostId)));

    switch (typePost) {
      case REPOST:
        return saveOrDeleteRepost(current, originalPost, postDtoIn);

      case COMMENT:
        return saveByType(current, originalPost, postDtoIn, TypePost.COMMENT);

      default:
        return getPostById(originalPostId);
    }
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

  public PostDtoOut getPostById(Long postId) {
    Post post = postRepo.findById(postId)
            .orElseThrow(() -> new PostNotFoundException(String.format("Post with id: %d not found", postId)));
    User user = userService.getUser();

    PostDtoOut postDtoOut = mapper.map(post, PostDtoOut.class);

    List<Post> listOriginalPosts = postRepo.findByOriginalPost(post);

    List<Like> likes = likeService.findByPostId(post.getId());

    List<PostDtoOut> comment = listOriginalPosts.stream()
            .filter(p -> p.getTypePost().equals(TypePost.COMMENT))
            .map(p-> mapper.map(p, PostDtoOut.class))
            .toList();

    List<Post> repost = listOriginalPosts.stream()
            .filter(p -> p.getTypePost().equals(TypePost.REPOST))
            .toList();

    postDtoOut.setComments(comment);
    postDtoOut.setCountLikes(likes.size());
    postDtoOut.setCountRepost(repost.size());
    postDtoOut.setCountComments(comment.size());

    postDtoOut.setHasMyLike(likes
            .stream()
            .anyMatch(like -> like.getUser().equals(user)));

    postDtoOut.setHasMyComment(listOriginalPosts.stream()
            .filter(p -> p.getTypePost().equals(TypePost.COMMENT))
            .anyMatch(p -> p.getUser().equals(user)));

    postDtoOut.setHasMyRepost(listOriginalPosts.stream()
            .filter(p -> p.getTypePost().equals(TypePost.REPOST))
            .anyMatch(p -> p.getUser().equals(user)));

    return postDtoOut;
  }

  public List<PostDtoOut> getCommentsByPost(Long postId, Integer page, Integer size) {

    Post post = postRepo.findById(postId)
            .orElseThrow(() -> new PostNotFoundException(String.format("Post with id: %d not found", postId)));

    Pageable pageRequest = getPageRequest(page, size);
    List<Post> allPosts = postRepo.findByOriginalPostAndTypePost(post, TypePost.COMMENT, pageRequest).stream().toList();

    return mapListPostToListPostDtoOut(allPosts);
  }

  private PageRequest getPageRequest(Integer page, Integer size) {
    return PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdDate"));
  }

  private List<PostDtoOut> mapListPostToListPostDtoOut(List<Post> allPosts) {

    User user = userService.getUser();

    List<Post> listOriginalPosts = postRepo.findByOriginalPostIn(allPosts);
    List<Like> likes = likeService.findByPostIn(allPosts);

    Map<Long, Long> postLikesCountMap = getPostLikesCountMap(likes);

    Map<Long, Long> postCommentCountMap = getPostCommentCountMap(listOriginalPosts);

    Map<Long, Long> postRepostCountMap = getPostRepostCountMap(listOriginalPosts);

    Map<Long, Boolean> userLikesMap = getUserLikesStatusMap(likes, user);

    Map<Long, Boolean> userCommentsMap = getUserCommentsStatusMap(listOriginalPosts, user);

    Map<Long, Boolean> userRepostsMap = getUserRepostsStatusMap(listOriginalPosts, user);

    return allPosts
            .stream()
            .map(p->mapper.map(p,PostDtoOut.class))
            .peek(postDtoOut -> {
              postDtoOut.setCountComments(Math.toIntExact(postCommentCountMap.getOrDefault(postDtoOut.getId(),0L)));
              postDtoOut.setCountRepost(Math.toIntExact(postRepostCountMap.getOrDefault(postDtoOut.getId(),0L)));
              postDtoOut.setCountLikes(Math.toIntExact(postLikesCountMap.getOrDefault(postDtoOut.getId(),0L)));
              postDtoOut.setHasMyLike(userLikesMap.getOrDefault(postDtoOut.getId(),false));
              postDtoOut.setHasMyComment(userCommentsMap.getOrDefault(postDtoOut.getId(),false));
              postDtoOut.setHasMyRepost(userRepostsMap.getOrDefault(postDtoOut.getId(),false));
            })
            .toList();
  }

  private Map<Long, Boolean> getUserRepostsStatusMap(List<Post> listOriginalPosts, User user) {
    return listOriginalPosts
            .stream()
            .filter(p -> p.getUser().equals(user)
                    && p.getTypePost().equals(TypePost.REPOST))
            .map(p -> p.getOriginalPost().getId())
            .distinct()
            .collect(Collectors.toMap(
              id -> id,
              id -> true
            ));
  }

  private Map<Long, Boolean> getUserCommentsStatusMap(List<Post> listOriginalPosts, User user) {
    return listOriginalPosts
            .stream()
            .filter(p -> p.getUser().equals(user)
                    && p.getTypePost().equals(TypePost.COMMENT))
            .map(p -> p.getOriginalPost().getId())
            .distinct()
            .collect(Collectors.toMap(
              id -> id,
              id -> true
            ));
  }

  private Map<Long, Boolean> getUserLikesStatusMap(List<Like> likes, User user) {
    return likes.stream()
            .filter(like -> like.getUser().equals(user))
            .map(p -> p.getPost().getId())
            .distinct()
            .collect(Collectors.toMap(
              id -> id,
              id -> true
            ));
  }

  private Map<Long, Long> getPostRepostCountMap(List<Post> listOriginalPosts) {
    return listOriginalPosts
            .stream()
            .filter(repost -> repost.getTypePost().equals(TypePost.REPOST))
            .collect(Collectors.groupingBy(
              repost -> repost.getOriginalPost().getId(),
              Collectors.counting()));
  }

  private Map<Long, Long> getPostCommentCountMap(List<Post> listOriginalPosts) {
    return listOriginalPosts
            .stream()
            .filter(comment -> comment.getTypePost().equals(TypePost.COMMENT))
            .collect(Collectors.groupingBy(
              comment -> comment.getOriginalPost().getId(),
              Collectors.counting()));
  }

  private Map<Long, Long> getPostLikesCountMap(List<Like> likes) {
    return likes
            .stream()
            .collect(Collectors.groupingBy(
              like -> like.getPost().getId(),
              Collectors.counting()));
  }

  private PostDtoOut saveOrDeleteRepost(User user, Post originalPost, PostDtoIn postDtoIn) {

    Optional<Post> repost = postRepo.findByUserAndOriginalPostAndTypePost(user, originalPost, TypePost.REPOST);
    if (repost.isPresent())  {
      postRepo.delete(repost.get());
    } else {
      saveByType(user, originalPost, postDtoIn, TypePost.REPOST);
    }

    return getPostById(originalPost.getId());
  }

  private PostDtoOut saveByType(User user, Post originalPost, PostDtoIn postDtoIn, TypePost typePost) {

    Post post = mapper.map(postDtoIn, Post.class);
    post.setUser(user);
    post.setTypePost(typePost);
    post.setOriginalPost(originalPost);
    Post postToSave = save(post, typePost);

    return getPostById(postToSave.getId());
  }

  private Post save(Post post, TypePost typePost) {
    Post postToSave = postRepo.save(post);
    notificationCreator.sendPostNotification(postToSave, typePost, userService.getFollowersDto(post.getUser().getId()));
    return postToSave;
  }

}