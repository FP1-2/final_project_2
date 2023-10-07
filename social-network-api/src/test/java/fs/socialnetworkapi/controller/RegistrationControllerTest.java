package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.dto.user.UserDtoIn;
import fs.socialnetworkapi.dto.user.UserDtoOut;
import fs.socialnetworkapi.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class RegistrationControllerTest {

  @Mock
  private UserService userService;

  @Mock
  private Model model;

  @InjectMocks
  private RegistrationController registrationController;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void testCreate() {
    // Arrange
    UserDtoIn userDtoIn = new UserDtoIn();
    userDtoIn.setFirstName("John");
    userDtoIn.setLastName("Doe");

    UserDtoOut userDtoOut = new UserDtoOut();
    userDtoOut.setFirstName("John");
    userDtoOut.setLastName("Doe");

    when(userService.addUser(userDtoIn)).thenReturn(userDtoOut);

    // Act
    ResponseEntity<UserDtoOut> responseEntity = registrationController.create(userDtoIn);

    // Assert
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    assertEquals(userDtoOut, responseEntity.getBody());
    verify(userService, times(1)).addUser(userDtoIn);
  }

  @Test
  void testActivate() {
    // Arrange
    String activationCode = "exampleCode";
    when(userService.activateUser(activationCode)).thenReturn(true);

    // Act
    String result = registrationController.activate(model, activationCode);

    // Assert
    verify(userService, times(1)).activateUser(activationCode);
    assertEquals("login", result);
  }
}
