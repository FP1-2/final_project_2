package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.exception.PostNotFoundException;
import fs.socialnetworkapi.exception.UserNotFoundException;
import fs.socialnetworkapi.service.LikeService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class LikeControllerTest {

  private AutoCloseable closeable;

  @Mock
  private LikeService likeService;

  @InjectMocks
  private LikeController likeController;

  @BeforeEach
  void setup() {
    closeable = MockitoAnnotations.openMocks(this);
  }

  @AfterEach
  void close() throws Exception {
    closeable.close();
  }

  @Test
  void testLikePostSuccess() {
    Long postId = 1L;
    Long userId = 2L;

    Mockito.when(likeService.likePost(postId, userId)).thenReturn("Liked");

    ResponseEntity<String> response = likeController.likePost(postId, userId);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals("Liked successfully", response.getBody());

    Mockito.verify(likeService, times(1)).likePost(postId, userId);
  }

  @Test
  void testUnlikePostSuccess() {
    Long postId = 1L;
    Long userId = 2L;

    Mockito.when(likeService.likePost(postId, userId)).thenReturn("Unliked");

    ResponseEntity<String> response = likeController.likePost(postId, userId);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals("Unliked successfully", response.getBody());

    Mockito.verify(likeService, times(1)).likePost(postId, userId);
  }

  @Test
  void testLikePostFailurePostNotFound() {
    Long postId = 1L;
    Long userId = 2L;

    Mockito.when(likeService.likePost(postId, userId)).thenThrow(new PostNotFoundException("No such post"));

    ResponseEntity<String> response = likeController.likePost(postId, userId);

    assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    assertEquals("Failed: fs.socialnetworkapi.exception.PostNotFoundException: No such post", response.getBody());

    Mockito.verify(likeService, times(1)).likePost(postId, userId);
  }

   @Test
  void testLikePostFailureUserNotFound() {
    Long postId = 1L;
    Long userId = 2L;

    Mockito.when(likeService.likePost(postId, userId)).thenThrow(new UserNotFoundException("No such user"));

    ResponseEntity<String> response = likeController.likePost(postId, userId);

    assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    assertEquals("Failed: fs.socialnetworkapi.exception.UserNotFoundException: No such user", response.getBody());

    Mockito.verify(likeService, times(1)).likePost(postId, userId);
  }

}
