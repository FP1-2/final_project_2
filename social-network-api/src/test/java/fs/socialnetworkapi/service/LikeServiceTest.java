package fs.socialnetworkapi.service;

import fs.socialnetworkapi.entity.Like;
import fs.socialnetworkapi.entity.Post;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.exception.PostNotFoundException;
import fs.socialnetworkapi.exception.UserNotFoundException;
import fs.socialnetworkapi.repos.LikeRepo;
import fs.socialnetworkapi.repos.PostRepo;
import fs.socialnetworkapi.repos.UserRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class LikeServiceTest {

  private LikeService likeService;

  @Mock
  private LikeRepo likeRepo;

  @Mock
  private UserRepo userRepo;

  @Mock
  private PostRepo postRepo;

  @BeforeEach
  public void setup() {
    MockitoAnnotations.initMocks(this);
    likeService = new LikeService(likeRepo, userRepo, postRepo);
  }

  @Test
  public void likePost_LikeExists_ChangesState() {
    User user = new User();
    user.setId(1L);
    Post post = new Post();
    post.setId(2L);

    Like like = new Like(user, post, true);

    when(userRepo.findById(1L)).thenReturn(Optional.of(user));
    when(postRepo.findById(2L)).thenReturn(Optional.of(post));
    when(likeRepo.findByPostIdAndUserId(2L, 1L)).thenReturn(Optional.of(like));

    likeService.likePost(2L, 1L);

    assertFalse(like.isLiked());
    verify(likeRepo, times(1)).save(like);
  }

  @Test
  public void likePost_LikeDoesNotExist_CreatesNewLike() {
    User user = new User();
    user.setId(1L);
    Post post = new Post();
    post.setId(2L);

    when(userRepo.findById(1L)).thenReturn(Optional.of(user));
    when(postRepo.findById(2L)).thenReturn(Optional.of(post));
    when(likeRepo.findByPostIdAndUserId(2L, 1L)).thenReturn(Optional.empty());

    likeService.likePost(2L, 1L);

    verify(likeRepo, times(1)).save(any(Like.class));
  }

  @Test
  public void likePost_UserNotFound_ThrowsException() {
    when(userRepo.findById(1L)).thenReturn(Optional.empty());

    assertThrows(UserNotFoundException.class, () -> likeService.likePost(2L, 1L));

    verify(likeRepo, never()).save(any(Like.class));
  }

  @Test
  public void likePost_PostNotFound_ThrowsException() {
    User user = new User();
    user.setId(1L);

    when(userRepo.findById(1L)).thenReturn(Optional.of(user));
    when(postRepo.findById(2L)).thenReturn(Optional.empty());

    assertThrows(PostNotFoundException.class, () -> likeService.likePost(2L, 1L));

    verify(likeRepo, never()).save(any(Like.class));
  }

  @Test
  public void getLikesForPost_PostExists_ReturnsLikes() {
    Long postId = 1L;
    Post post = new Post();
    post.setId(postId);

    List<Like> likes = new ArrayList<>();
    likes.add(new Like(new User(), post, true));
    likes.add(new Like(new User(), post, false));

    when(postRepo.findById(postId)).thenReturn(Optional.of(post));
    when(likeRepo.findByPostId(postId)).thenReturn(likes);

    List<Like> result = likeService.getLikesForPost(postId);

    assertEquals(1, result.size());
  }

  @Test
  public void getLikesForPost_LikeDoesNotExist_ReturnsEmptyList() {
    Long postId = 1L;

    when(likeRepo.findByPostId(postId)).thenReturn(Collections.emptyList());

    List<Like> result = likeService.getLikesForPost(postId);

    assertTrue(result.isEmpty());
  }

  @Test
  public void getLikesForUser_UserExists_ReturnsLikes() {
    Long userId = 1L;
    User user = new User();
    user.setId(userId);

    List<Like> likes = new ArrayList<>();
    likes.add(new Like(user, new Post(), true));
    likes.add(new Like(user, new Post(), false));

    when(userRepo.findById(userId)).thenReturn(Optional.of(user));
    when(likeRepo.findByUserId(userId)).thenReturn(likes);

    List<Like> result = likeService.getLikesForUser(userId);

    assertEquals(1, result.size());
  }

  @Test
  public void getLikesForUser_LikeDoesNotExist_ReturnsEmptyList() {
    Long userId = 1L;

    when(likeRepo.findByUserId(userId)).thenReturn(Collections.emptyList());

    List<Like> result = likeService.getLikesForUser(userId);

    assertTrue(result.isEmpty());
  }

}
