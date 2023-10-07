package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.dto.post.PostDtoIn;
import fs.socialnetworkapi.dto.post.PostDtoOut;
import fs.socialnetworkapi.service.PostService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class PostControllerTest {

  @Mock
  private PostService postService;

  @InjectMocks
  private PostController postController;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void testGetAllPosts() {
    // Arrange
    List<PostDtoOut> posts = new ArrayList<>();
    when(postService.getAllPost(0, 10)).thenReturn(posts);

    // Act
    ResponseEntity<List<PostDtoOut>> responseEntity = postController.getAllPosts(0, 10);

    // Assert
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    assertEquals(posts, responseEntity.getBody());
    verify(postService, times(1)).getAllPost(0, 10);
  }

  @Test
  void testGetUserPosts() {
    // Arrange
    Long userId = 1L;
    List<PostDtoOut> posts = new ArrayList<>();
    when(postService.getAllUserPosts(userId, 0, 10)).thenReturn(posts);

    // Act
    ResponseEntity<List<PostDtoOut>> responseEntity = postController.getAllPosts(userId, 0, 10);

    // Assert
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    assertEquals(posts, responseEntity.getBody());
    verify(postService, times(1)).getAllUserPosts(userId, 0, 10);
  }

  @Test
  void testGetFollowingsPosts() {
    // Arrange
    Long userId = 1L;
    List<PostDtoOut> posts = new ArrayList<>();
    when(postService.getFollowingsPosts(userId, 0, 10)).thenReturn(posts);

    // Act
    ResponseEntity<List<PostDtoOut>> responseEntity = postController.getFollowingsPosts(userId, 0, 10);

    // Assert
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    assertEquals(posts, responseEntity.getBody());
    verify(postService, times(1)).getFollowingsPosts(userId, 0, 10);
  }

//  @Test
//  void testAddPost() {
//    // Arrange
//    Long userId = 1L;
//    PostDtoIn postDtoIn = new PostDtoIn();
//    PostDtoOut postDtoOut = new PostDtoOut();
//    when(postService.save(userId, postDtoIn)).thenReturn(postDtoOut);
//
//    // Act
//    ResponseEntity<PostDtoOut> responseEntity = postController.addPost(userId, postDtoIn);
//
//    // Assert
//    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
//    assertEquals(postDtoOut, responseEntity.getBody());
//    verify(postService, times(1)).save(userId, postDtoIn);
//  }

  @Test
  void testRemovePost() {
    // Arrange
    Long userId = 1L;
    Long postId = 2L;

    // Act
    ResponseEntity<?> responseEntity = postController.removePost(userId, postId);

    // Assert
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    verify(postService, times(1)).deletePost(postId);
  }

//  @Test
//  void testEditPost() {
//    // Arrange
//    Long userId = 1L;
//    PostDtoIn postDtoIn = new PostDtoIn();
//    PostDtoOut postDtoOut = new PostDtoOut();
//    when(postService.editePost(postDtoIn)).thenReturn(postDtoOut);
//
//    // Act
//    ResponseEntity<PostDtoOut> responseEntity = postController.editePost(userId, postDtoIn);
//
//    // Assert
//    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
//    assertEquals(postDtoOut, responseEntity.getBody());
//    verify(postService, times(1)).editePost(postDtoIn);
//  }

  @Test
  void testAddRepost() {
    // Arrange
    Long userId = 1L;
    Long postId = 2L;
    PostDtoOut postDtoOut = new PostDtoOut();
    when(postService.saveRepost(userId, postId)).thenReturn(postDtoOut);

    // Act
    ResponseEntity<PostDtoOut> responseEntity = postController.addRepost(userId, postId);

    // Assert
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    assertEquals(postDtoOut, responseEntity.getBody());
    verify(postService, times(1)).saveRepost(userId, postId);
  }

  @Test
  void testRemoveRepost() {
    // Arrange
    Long userId = 1L;
    Long postId = 2L;

    // Act
    ResponseEntity<PostDtoOut> responseEntity = postController.removeRepost(userId, postId);

    // Assert
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    verify(postService, times(1)).deleteRepost(userId, postId);
  }
}