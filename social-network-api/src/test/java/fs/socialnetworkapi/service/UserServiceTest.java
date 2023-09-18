package fs.socialnetworkapi.service;
import fs.socialnetworkapi.dto.Mapper;
import fs.socialnetworkapi.dto.UserDtoIn;
import fs.socialnetworkapi.dto.UserDtoOut;
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

class UserServiceTest {

  @Mock
  private UserRepo userRepo;

  @Mock
  private MailService mailService;

  @Mock
  private Mapper mapper;

  @InjectMocks
  private UserService userService;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void testAddUser() {
    UserDtoIn userDtoIn = new UserDtoIn();
    userDtoIn.setEmail("test@example.com");
    userDtoIn.setFirstName("John");
    userDtoIn.setActive(false);

    User userFromDb = null;
    when(userRepo.findByEmail("test@example.com")).thenReturn(userFromDb);

    User userToSave = new User();
    when(mapper.map(userDtoIn)).thenReturn(userToSave);

    when(userRepo.save(userToSave)).thenReturn(userToSave);

    UserDtoOut result = userService.addUser(userDtoIn);

    verify(userRepo, times(1)).findByEmail("test@example.com");
    verify(userRepo, times(1)).save(userToSave);
  }



  @Test
  void testAddUserDuplicateEmail() {
    User existingUser = new User();
    existingUser.setEmail("test@example.com");

    when(userRepo.findByEmail("test@example.com")).thenReturn(existingUser);

    User user = new User();
    user.setEmail("test@example.com");

    verify(userRepo, times(0)).save(user);
    verify(mailService, times(0)).send(
      anyString(),
      anyString(),
      anyString()
    );
  }

  @Test
  void testActivateUser() {
    String activationCode = UUID.randomUUID().toString();
    User user = new User();
    user.setActivationCode(activationCode);

    when(userRepo.findByActivationCode(activationCode)).thenReturn(user);

    assertTrue(userService.activateUser(activationCode));

    assertNull(user.getActivationCode());
    verify(userRepo, times(1)).save(user);
  }

  @Test
  void testActivateUserInvalidCode() {
    String invalidCode = "invalid_code";

    when(userRepo.findByActivationCode(invalidCode)).thenReturn(null);

    assertFalse(userService.activateUser(invalidCode));
  }
}