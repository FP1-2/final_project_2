package fs.socialnetworkapi.service;

import fs.socialnetworkapi.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PasswordResetServiceTest {

  @Mock
  private UserService userService;

  @Mock
  private MailService mailService;

  private PasswordResetService passwordResetService;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    passwordResetService = new PasswordResetService(userService, mailService);
  }

  @Test
  void testGenerateActivationCode() {
    User user = new User();
    String activationCode = passwordResetService.generateActivationCode(user);
    verify(userService, times(1)).upgradeUser(user);
    assertNotNull(activationCode);
    assertTrue(isValidUUID(activationCode));
    assertEquals(activationCode, user.getActivationCode());
  }

  @Test
  void testSendActivationCode() {
    User user = new User();
    user.setEmail("test@example.com");

    passwordResetService.sendActivationCode(user);

    verify(mailService, times(1)).send(eq("test@example.com"), eq("Password Reset"), anyString());
    String expectedLink = "http://localhost:5000/reset/confirm?code=" + user.getActivationCode();
    verify(mailService).send(eq("test@example.com"), eq("Password Reset"), contains(expectedLink));
  }

  @Test
  void testSetNewActivationCode() {
    String email = "test@example.com";

    when(userService.findByEmail(email)).thenReturn(new User());

    passwordResetService.setNewActivationCode(email);
  }

  @Test
  void testSetNewPassword() {
    User user = new User();
    String newPassword = "newPassword";

    passwordResetService.setNewPassword(user, newPassword);
    verify(userService, times(1)).upgradeUser(user);
    assertEquals(newPassword, user.getPassword());
  }

  @Test
  void testChangePassword() {
    String activationCode = "validActivationCode";
    String newPassword = "newPassword";

    User user = new User();
    when(userService.findByActivationCode(activationCode)).thenReturn(user);

    passwordResetService.changePassword(activationCode, newPassword);
  }

  private boolean isValidUUID(String uuid) {
    try {
      UUID.fromString(uuid);
      return true;
    } catch (IllegalArgumentException e) {
      return false;
    }
  }
}
