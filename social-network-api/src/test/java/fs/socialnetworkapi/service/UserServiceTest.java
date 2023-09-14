package fs.socialnetworkapi.service;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.repos.UserRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserServiceTest {

  @Mock
  private UserRepo userRepo;

  @Mock
  private MailService mailService;

  @InjectMocks
  private UserService userService;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void testAddUser() {
    User user = new User();
    user.setEmail("test@example.com");
    user.setActive(false);
    String activationCode = UUID.randomUUID().toString();
    user.setActivationCode(activationCode);

    when(userRepo.findByEmail("test@example.com")).thenReturn(null);

    assertTrue(userService.addUser(user));

    verify(userRepo, times(1)).save(user);
    verify(mailService, times(1)).send(
      eq("test@example.com"),
      eq("Activation code"),
      anyString()
    );
  }

  @Test
  public void testAddUserDuplicateEmail() {
    User existingUser = new User();
    existingUser.setEmail("test@example.com");

    when(userRepo.findByEmail("test@example.com")).thenReturn(existingUser);

    User user = new User();
    user.setEmail("test@example.com");

    assertFalse(userService.addUser(user));

    verify(userRepo, times(0)).save(user);
    verify(mailService, times(0)).send(
      anyString(),
      anyString(),
      anyString()
    );
  }

  @Test
  public void testActivateUser() {
    String activationCode = UUID.randomUUID().toString();
    User user = new User();
    user.setActivationCode(activationCode);

    when(userRepo.findByActivationCode(activationCode)).thenReturn(user);

    assertTrue(userService.activateUser(activationCode));

    assertNull(user.getActivationCode());
    verify(userRepo, times(1)).save(user);
  }

  @Test
  public void testActivateUserInvalidCode() {
    String invalidCode = "invalid_code";

    when(userRepo.findByActivationCode(invalidCode)).thenReturn(null);

    assertFalse(userService.activateUser(invalidCode));
  }
}