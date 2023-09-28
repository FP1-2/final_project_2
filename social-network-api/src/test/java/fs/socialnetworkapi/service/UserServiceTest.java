package fs.socialnetworkapi.service;
import fs.socialnetworkapi.dto.Mapper;
import fs.socialnetworkapi.dto.user.UserDtoIn;
import fs.socialnetworkapi.dto.user.UserDtoOut;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.exception.UserNotFoundException;
import fs.socialnetworkapi.repos.UserRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;
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

  @Test
  public void testUpgradeUser() {
    User user = new User();
    userService.upgradeUser(user);
    verify(userRepo, times(1)).save(user);
  }

  @Test
  public void testFindByActivationCode() {
    String activationCode = "testActivationCode";
    User user = new User();
    user.setActivationCode(activationCode);

    when(userRepo.findByActivationCode(activationCode)).thenReturn(user);

    User foundUser = userService.findByActivationCode(activationCode);

    assertNotNull(foundUser);
    assertEquals(activationCode, foundUser.getActivationCode());
    verify(userRepo, times(1)).findByActivationCode(activationCode);
  }

  @Test
  public void testFindByEmail() {
    String userEmail = "test@example.com";
    User user = new User();
    user.setEmail(userEmail);

    when(userRepo.findByEmail(userEmail)).thenReturn(user);

    User foundUser = userService.findByEmail(userEmail);

    assertNotNull(foundUser);
    assertEquals(userEmail, foundUser.getEmail());
    verify(userRepo, times(1)).findByEmail(userEmail);
  }

  @Test
  void testSubscribe_whenUserNotFound(){

    Mockito.when(userRepo.findById(any())).thenReturn(Optional.empty());

    assertThrows(UserNotFoundException.class, () -> userService.subscribe(1L,2L));
  }

  @Test
  void testSubscribe(){

    User currentUser = new User();
    currentUser.setId(1L);
    User user = new User();
    user.setId(2L);

    Mockito.when(userRepo.findById(1L)).thenReturn(Optional.of(currentUser));
    Mockito.when(userRepo.findById(2L)).thenReturn(Optional.of(user));

    userService.subscribe(1L,2L);

    verify(userRepo, times(2)).findById(any());
    verify(userRepo,times(1)).save(any(User.class));
    assertEquals(1,userRepo.findById(2L).get().getFollowers().size());
    assertEquals(1,user.getFollowers().size());
  }
  @Test
  void testUnsubscribe_whenUserNotFound(){

    Mockito.when(userRepo.findById(any())).thenReturn(Optional.empty());

    assertThrows(UserNotFoundException.class, () -> userService.unsubscribe(1L,2L));
  }

  @Test
  void testUnsubscribe(){

    User currentUser = new User();
    currentUser.setId(1L);
    User user = new User();
    user.setId(2L);
    user.getFollowers().add(currentUser);

    Mockito.when(userRepo.findById(1L)).thenReturn(Optional.of(currentUser));
    Mockito.when(userRepo.findById(2L)).thenReturn(Optional.of(user));

    userService.unsubscribe(1L,2L);

    verify(userRepo, times(2)).findById(any());
    verify(userRepo,times(1)).save(any(User.class));
    assertEquals(0,userRepo.findById(2L).get().getFollowers().size());
    assertEquals(0,user.getFollowers().size());
  }
  @Test
  void testGetFollowers_whenUserNotFound(){
    Mockito.when(userRepo.findById(any())).thenReturn(Optional.empty());

    assertThrows(UserNotFoundException.class, () -> userService.getFollowers(1L));
  }
  @Test
  void testGetFollowers(){
    User currentUser = new User();
    currentUser.setId(1L);
    User user = new User();
    user.setId(2L);
    user.getFollowers().add(currentUser);

    Mockito.when(userRepo.findById(2L)).thenReturn(Optional.of(user));
    Mockito.when(mapper.map(any(User.class))).thenReturn(any(UserDtoOut.class));

    List<UserDtoOut> followers = userService.getFollowers(2L);
    verify(userRepo, times(1)).findById(any());
    assertEquals(1,followers.size());

  }
  @Test
  void testGetFollowings_whenUserNotFound(){
    Mockito.when(userRepo.findById(any())).thenReturn(Optional.empty());

    assertThrows(UserNotFoundException.class, () -> userService.getFollowings(1L));
  }
  @Test
  void testGetFollowings(){

    User currentUser = new User();
    currentUser.setId(1L);
    User user = new User();
    user.setId(2L);

    currentUser.getFollowings().add(user);

    Mockito.when(userRepo.findById(1L)).thenReturn(Optional.of(currentUser));
    Mockito.when(mapper.map(any(User.class))).thenReturn(any(UserDtoOut.class));

    List<UserDtoOut> followings = userService.getFollowings(1L);
    verify(userRepo, times(1)).findById(any());
    assertEquals(1,followings.size());
  }
}