package fs.socialnetworkapi.service;

import fs.socialnetworkapi.dto.notification.NotificationCreator;
import fs.socialnetworkapi.dto.post.PostDtoOut;
import fs.socialnetworkapi.dto.user.UserDtoIn;
import fs.socialnetworkapi.dto.user.UserDtoOut;
import fs.socialnetworkapi.entity.Notification;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.exception.UserNotFoundException;
import fs.socialnetworkapi.repos.PostRepo;
import fs.socialnetworkapi.repos.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
  private final UserRepo userRepo;
  private final MailService mailService;
  private final ModelMapper mapper;
  private final PasswordEncoder passwordEncoder;
  private final PostRepo postRepo;

  @Value("${myapp.baseUrl}")
  private String baseUrl;
//  @Value("${spring.datasource.url}")
//  private String JDBC_URL;
//  @Value("${username}")
//  private String USERNAME;
//  @Value("${password}")
//  private String PASSWORD;

  public User getUser() {
    return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }

  public User findById(Long userId) {
    return userRepo.findById(userId)
            .orElseThrow(() -> new UserNotFoundException(String.format("User with id: %d not found", userId)));
  }

  public User findByEmail(String email) {
    return userRepo.findByEmail(email);
  }

  public User findByActivationCode(String activationCode) {
    return userRepo.findByActivationCode(activationCode);
  }

  public User saveUser(User user) {
    return userRepo.save(user);
  }

  public UserDtoOut showUser(Long userId) {
    User user = userRepo.getReferenceById(userId);
    UserDtoOut userDtoOut = mapper.map(user, UserDtoOut.class);
    userDtoOut.setUserFollowingCount(getFollowings(userId).size());
    userDtoOut.setUserFollowersCount(getFollowers(userId).size());
    userDtoOut.setUserTweetCount(getUserPosts(userId, 0, 1000000).size());// need to correct
    return userDtoOut;
  }

  public List<PostDtoOut> getUserPosts(Long currentUserId, Integer page, Integer size) {

    User user = userRepo.findById(currentUserId)
      .orElseThrow(() -> new UserNotFoundException(String.format("User with id: %d not found", currentUserId)));

    PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdDate"));

    return postRepo.findByUser(user, pageRequest)
      .stream()
      .map(p -> mapper.map(p, PostDtoOut.class))
      .toList();
  }

  public UserDtoOut editUser(UserDtoIn userDtoIn) {
    User user = getUser();
    String email = user.getEmail();
    User userFromDb = findByEmail(email);
    LocalDateTime createdDateUser = userFromDb.getCreatedDate();
    String password = userFromDb.getPassword();
    user.setFirstName(userDtoIn.getFirstName());
    user.setLastName(userDtoIn.getLastName());
    user.setBirthday(userDtoIn.getBirthday());
    user.setMainPhoto(userDtoIn.getMainPhoto());
    user.setAvatar(userDtoIn.getAvatar());
    user.setPassword(password);
    user.setAddress(userDtoIn.getAddress());
    user.setRoles("USER");
    user.setActive(true);
    user.setCreatedDate(createdDateUser);
    user.setUsername(userDtoIn.getUsername());
    user.setUserDescribe(userDtoIn.getUserDescribe());
    user.setBgProfileImage(userDtoIn.getBgProfileImage());
    user.setUserLink(userDtoIn.getUserLink());
    return mapper.map(saveUser(user), UserDtoOut.class);
  }

  public UserDtoOut addUser(UserDtoIn userDtoIn) {
    User userFromDb = findByEmail(userDtoIn.getEmail());
    return (userFromDb == null)
            ? createUser(userDtoIn)
            : mapper.map(userFromDb, UserDtoOut.class);
  }

  private UserDtoOut createUser(UserDtoIn userDtoIn) {
    userDtoIn.setActive(false);
    userDtoIn.setActivationCode(UUID.randomUUID().toString());
    userDtoIn.setPassword(passwordEncoder.encode(userDtoIn.getPassword()));
    userDtoIn.setRoles("USER");
    User user1 = saveUser(mapper.map(userDtoIn, User.class));
    sendActivationCode(userDtoIn);
    return mapper.map(user1, UserDtoOut.class);
  }

  private void sendActivationCode(UserDtoIn userDtoIn) {
    String message = String.format(
            "Hello, %s!\nWelcome to Twitter. Please, visit next link: %s/api/v1/activate/%s",
            userDtoIn.getFirstName(),
            baseUrl,
            userDtoIn.getActivationCode()
    );
    mailService.send(userDtoIn.getEmail(), "Activation code", message);
  }

  public boolean activateUser(String code) {
    User user = findByActivationCode(code);
    if (user == null) {
      return false;
    }
    user.setRoles("USER");
    user.setActivationCode(null);
    user.setActive(true);
    saveUser(user);
    return true;
  }

  public void subscribe(Long userId) {
    User currentUser = getUser();

    User user = findById(userId);
    sendSubscriberNotification(user);
    user.getFollowers().add(currentUser);
    saveUser(user);
  }

  public void unsubscribe(Long userId) {
    User currentUser = getUser();
    User user = findById(userId);
    user.getFollowers().remove(currentUser);
    saveUser(user);
  }

  public List<UserDtoOut> getFollowers(Long userId) {
    return findById(userId).getFollowers()
            .stream()
            .map(u -> mapper.map(u, UserDtoOut.class))
            .toList();
  }

  public List<UserDtoOut> getFollowings(Long userId) {
    return findById(userId).getFollowings()
            .stream()
            .map(u -> mapper.map(u, UserDtoOut.class))
            .toList();
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return findByEmail(username);
  }

  private void sendSubscriberNotification(User user) {
    Notification notification = new NotificationCreator().subscriberNotification(user);
  }

//  public boolean isUsernameUnique(String username) {
//    try (Connection connection = DriverManager.getConnection(JDBC_URL, USERNAME, PASSWORD)) {
//      String sql = "SELECT COUNT(*) FROM users WHERE username = ?";
//      try (PreparedStatement statement = connection.prepareStatement(sql)) {
//        statement.setString(1, username);
//        try (ResultSet resultSet = statement.executeQuery()) {
//          if (resultSet.next()) {
//            int count = resultSet.getInt(1);
//            return count == 0;
//          }
//        }
//      }
//    } catch (SQLException e) {
//      e.printStackTrace();
//    }
//    return false;
//  }

}