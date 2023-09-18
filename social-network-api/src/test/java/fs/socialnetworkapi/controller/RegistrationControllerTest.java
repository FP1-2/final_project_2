package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.ui.Model;

import static org.mockito.Mockito.*;

class RegistrationControllerTest {

  @Mock
  private UserService userService;

  @InjectMocks
  private RegistrationController registrationController;

  @Mock
  private Model model;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.openMocks(this);
  }

//  @Test
//  void testCreate() {
//    User user = new User();
//    registrationController.create(user);
//
//    verify(userService, times(1)).addUser(user);
//  }

  @Test
  void testActivateUserSuccess() {
    String activationCode = "validCode";
    when(userService.activateUser(activationCode)).thenReturn(true);

    String result = registrationController.activate(model, activationCode);

    verify(model, times(1)).addAttribute("message", "User successfully activated");
    assert "login".equals(result);
  }

  @Test
  void testActivateUserFailure() {
    String activationCode = "invalidCode";
    when(userService.activateUser(activationCode)).thenReturn(false);

    String result = registrationController.activate(model, activationCode);

    verify(model, times(1)).addAttribute("message", "Activation code is not found!");
    assert "login".equals(result);
  }
}