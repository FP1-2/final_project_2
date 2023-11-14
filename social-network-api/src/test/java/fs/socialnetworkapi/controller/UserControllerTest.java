package fs.socialnetworkapi.controller;

import ch.qos.logback.core.model.Model;
import fs.socialnetworkapi.dto.EmailRequest;
import fs.socialnetworkapi.dto.user.UserDtoOut;
import fs.socialnetworkapi.dto.user.UserDtoIn;
import fs.socialnetworkapi.dto.password.PasswordResetRequest;
import fs.socialnetworkapi.service.AuthorizationService;
import fs.socialnetworkapi.service.PasswordResetService;
import fs.socialnetworkapi.service.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
class UserControllerTest {

  @InjectMocks
  private UserController userController;

  @Mock
  private UserService userService;

  @Mock
  private AuthorizationService authorizationService;

  @Mock
  private PasswordResetService passwordResetService;

  @Mock
  private Model model;

  private AutoCloseable closeable;
  private final String testString = "test@example.com";


  @BeforeEach
  void setup() {
    closeable = MockitoAnnotations.openMocks(this);
  }

  @AfterEach
  void close() throws Exception {
    closeable.close();
  }

  @Test
  void testSubscribe() {
    // Arrange
    Long currentUserId = 1L;
    Long userId = 2L;

    // Act
    ResponseEntity<?> responseEntity = userController.subscribe(userId);

    // Assert
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    verify(userService, times(1)).subscribe(userId);
  }

  @Test
  void testUnsubscribe() {
    // Arrange
    Long currentUserId = 1L;
    Long userId = 2L;

    // Act
    ResponseEntity<?> responseEntity = userController.unsubscribe(userId);

    // Assert
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    verify(userService, times(1)).unsubscribe(userId);
  }

  @Test
  void testGetFollowers() {
    // Arrange
    Long currentUserId = 1L;
    List<UserDtoOut> followers = new ArrayList<>();
    when(userService.getFollowersDto(currentUserId)).thenReturn(followers);

    // Act
    ResponseEntity<List<UserDtoOut>> responseEntity = userController.getFollowers(currentUserId);

    // Assert
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    assertEquals(followers, responseEntity.getBody());
    verify(userService, times(1)).getFollowersDto(currentUserId);
  }

  @Test
  void testGetFollowings() {
    // Arrange
    Long currentUserId = 1L;
    List<UserDtoOut> followings = new ArrayList<>();
    when(userService.getFollowingsDto(currentUserId)).thenReturn(followings);

    // Act
    ResponseEntity<List<UserDtoOut>> responseEntity = userController.getFollowings(currentUserId);

    // Assert
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    assertEquals(followings, responseEntity.getBody());
    verify(userService, times(1)).getFollowingsDto(currentUserId);
  }

   @Test
  void testCreate() {
    // Arrange
    UserDtoIn userDtoIn = new UserDtoIn();
    UserDtoOut userDtoOut = new UserDtoOut();
    when(userService.addUser(userDtoIn)).thenReturn(userDtoOut);

    // Act
    ResponseEntity<UserDtoOut> responseEntity = userController.createNewUser(userDtoIn);

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

  @Test
  void testRequestPasswordResetSuccess() {
    EmailRequest emailRequest = new EmailRequest();
    emailRequest.setEmail(testString);

    Mockito.when(passwordResetService.setNewActivationCode(testString)).thenReturn(true);

    ResponseEntity<?> response = userController.requestPasswordReset(emailRequest);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    Mockito.verify(passwordResetService, times(1)).setNewActivationCode(testString);
  }

  @Test
  void testRequestPasswordResetFailure() {
    EmailRequest emailRequest = new EmailRequest();
    emailRequest.setEmail(testString);

    Mockito.when(passwordResetService.setNewActivationCode(testString)).thenReturn(false);

    ResponseEntity<?> response = userController.requestPasswordReset(emailRequest);

    assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    Mockito.verify(passwordResetService, times(1)).setNewActivationCode(testString);
  }

  @Test
  void testConfirmPasswordResetSuccess() {
    PasswordResetRequest resetRequest = new PasswordResetRequest();

    Mockito.when(passwordResetService.changePassword(resetRequest)).thenReturn(true);

    ResponseEntity<?> response = userController.confirmPasswordReset(resetRequest);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    Mockito.verify(passwordResetService, times(1)).changePassword(resetRequest);
  }

  @Test
  void testConfirmPasswordResetFailure() {
    PasswordResetRequest resetRequest = new PasswordResetRequest();

    Mockito.when(passwordResetService.changePassword(resetRequest)).thenReturn(false);

    ResponseEntity<?> response = userController.confirmPasswordReset(resetRequest);

    assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    Mockito.verify(passwordResetService, times(1)).changePassword(resetRequest);
  }

}