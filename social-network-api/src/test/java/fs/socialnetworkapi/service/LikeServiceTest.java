package fs.socialnetworkapi.service;

import fs.socialnetworkapi.entity.Like;
import fs.socialnetworkapi.entity.Post;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.exception.UserNotFoundException;
import fs.socialnetworkapi.repos.LikeRepo;
import fs.socialnetworkapi.repos.PostRepo;
import fs.socialnetworkapi.repos.UserRepo;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class LikeServiceTest {

  @Mock
  private LikeRepo likeRepo;

  @Mock
  private UserRepo userRepo;

  @Mock
  private PostRepo postRepo;

  @InjectMocks
  private LikeService likeService;
  private AutoCloseable closeable;

  @BeforeEach
  void setup() {
    closeable = MockitoAnnotations.openMocks(this);
  }

  @AfterEach
  void close() throws Exception {
    closeable.close();
  }

  @Test
  void likePost_LikeExists_DeleteLike() {
    User user = new User();
    user.setId(1L);
    Post post = new Post();
    post.setId(2L);

    Like like = new Like(user, post);

    when(userRepo.findById(1L)).thenReturn(Optional.of(user));
    when(postRepo.findById(2L)).thenReturn(Optional.of(post));
    when(likeRepo.findByPostIdAndUserId(2L, 1L)).thenReturn(Optional.of(like));

    likeService.likePost(2L, 1L);

    verify(likeRepo, times(1)).delete(like);
  }

  @Test
  void likePost_LikeDoesNotExist_CreatesNewLike() {
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
  void likePost_UserNotFound_ThrowsException() {
    when(userRepo.findById(1L)).thenReturn(Optional.empty());

    assertThrows(UserNotFoundException.class, () -> likeService.likePost(2L, 1L));

    verify(likeRepo, never()).save(any(Like.class));
    verify(likeRepo, never()).delete(any(Like.class));
  }

  @Test
  void getLikesForUser_UserExists_ReturnsLikes() {
    Long userId = 1L;
    User user = new User();
    user.setId(userId);

    List<Like> likes = new ArrayList<>();
    likes.add(new Like(user, new Post()));
    likes.add(new Like(user, new Post()));

    when(userRepo.findById(userId)).thenReturn(Optional.of(user));
    when(likeRepo.findByUserId(userId)).thenReturn(likes);

    List<Like> result = likeService.getLikesForUser(userId);

    assertEquals(likes.size(), result.size());
  }

  @Test
  void getLikesForUser_LikeDoesNotExist_ReturnsEmptyList() {
    Long userId = 1L;

    when(likeRepo.findByUserId(userId)).thenReturn(Collections.emptyList());

    List<Like> result = likeService.getLikesForUser(userId);

    assertTrue(result.isEmpty());
  }
}
