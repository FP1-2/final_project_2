package fs.socialnetworkapi.controller;

import ch.qos.logback.core.model.Model;
import fs.socialnetworkapi.dto.user.UserDtoOut;
import fs.socialnetworkapi.dto.user.UserDtoIn;
import fs.socialnetworkapi.service.UserService;
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
class UserControllerTest {

  @Mock
  private UserService userService;
  @InjectMocks
  private UserController userController;
  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void testSubscribe() {
    // Arrange
    Long currentUserId = 1L;
    Long userId = 2L;

    // Act
    ResponseEntity<?> responseEntity = userController.subscribe(currentUserId, userId);

    // Assert
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    verify(userService, times(1)).subscribe(currentUserId, userId);
  }

  @Test
  void testUnsubscribe() {
    // Arrange
    Long currentUserId = 1L;
    Long userId = 2L;

    // Act
    ResponseEntity<?> responseEntity = userController.unsubscribe(currentUserId, userId);

    // Assert
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    verify(userService, times(1)).unsubscribe(currentUserId, userId);
  }

  @Test
  void testGetFollowers() {
    // Arrange
    Long currentUserId = 1L;
    List<UserDtoOut> followers = new ArrayList<>();
    when(userService.getFollowers(currentUserId)).thenReturn(followers);

    // Act
    ResponseEntity<List<UserDtoOut>> responseEntity = userController.getFollowers(currentUserId);

    // Assert
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    assertEquals(followers, responseEntity.getBody());
    verify(userService, times(1)).getFollowers(currentUserId);
  }

  @Test
  void testGetFollowings() {
    // Arrange
    Long currentUserId = 1L;
    List<UserDtoOut> followings = new ArrayList<>();
    when(userService.getFollowings(currentUserId)).thenReturn(followings);

    // Act
    ResponseEntity<List<UserDtoOut>> responseEntity = userController.getFollowings(currentUserId);

    // Assert
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    assertEquals(followings, responseEntity.getBody());
    verify(userService, times(1)).getFollowings(currentUserId);
  }

  @Mock
  private Model model;

  @InjectMocks
  private UserController registrationController;

   @Test
  void testCreate() {
    // Arrange
    UserDtoIn userDtoIn = new UserDtoIn();
    UserDtoOut userDtoOut = new UserDtoOut();
    when(userService.addUser(userDtoIn)).thenReturn(userDtoOut);

    // Act
    ResponseEntity<UserDtoOut> responseEntity = registrationController.create(userDtoIn);

    // Assert
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    assertEquals(userDtoOut, responseEntity.getBody());
    verify(userService, times(1)).addUser(userDtoIn);
  }


//  @Test
//  void testActivate() {
//    // Arrange
//    String activationCode = "testActivationCode";
//    when(userService.activateUser(activationCode)).thenReturn(true);
//    registrationController.activate((org.springframework.ui.Model) model, activationCode);
//
//    // Act
//    ResponseEntity<Model> responseEntity = registrationController.activate(model, activationCode);
//
//    // Assert
//    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
//    verify(model, times(2)).addAttribute(eq("message"), anyString());
//    verify(userService, times(2)).activateUser(activationCode);
//  }
}