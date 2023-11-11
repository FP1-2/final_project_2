package fs.socialnetworkapi.service;

import fs.socialnetworkapi.component.NotificationCreator;
import fs.socialnetworkapi.dto.post.PostDtoOut;
import fs.socialnetworkapi.dto.user.UserDtoIn;
import fs.socialnetworkapi.dto.user.UserDtoOut;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.exception.UserNotFoundException;
import fs.socialnetworkapi.repos.PostRepo;
import fs.socialnetworkapi.repos.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
  private final UserRepo userRepo;
  private final MailService mailService;
  private final ModelMapper mapper;
  private final PasswordEncoder passwordEncoder;
  private final PostRepo postRepo;

  @Autowired
  private final NotificationCreator notificationCreator;

  @Value("${myapp.baseUrl}")
  private String baseUrl;

  private User getUser() {
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
    userFromDb.setFirstName(userDtoIn.getFirstName());
    userFromDb.setLastName(userDtoIn.getLastName());
    userFromDb.setBirthday(userDtoIn.getBirthday());
    userFromDb.setMainPhoto(userDtoIn.getMainPhoto());
    userFromDb.setAvatar(userDtoIn.getAvatar());
    userFromDb.setUsername(userDtoIn.getUsername());
    userFromDb.setAddress(userDtoIn.getAddress());
    userFromDb.setUserDescribe(userDtoIn.getUserDescribe());
    userFromDb.setBgProfileImage(userDtoIn.getBgProfileImage());
    userFromDb.setUserLink(userDtoIn.getUserLink());
    return mapper.map(saveUser(userFromDb), UserDtoOut.class);
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
            "Hello, %s!\nWelcome to Twitter. Please, visit next link: %sapi/v1/activate/%s",
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
    //
    // This logic doesn't work correctly
    // Need to be remade
    //
    //user.getFollowers().add(currentUser); - an error occurred here!!!
    //saveUser(user);
  }

  public void unsubscribe(Long userId) {
    User currentUser = getUser();
    User user = findById(userId);
    user.getFollowers().remove(currentUser); // I guess it will be the same here!!!
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
    notificationCreator.subscriberNotification(user);
  }

  public boolean isUsernameUnique(String username) {
    User user = getUser();
    return userRepo.findByUsername(username) == null
      || Objects.equals(user.getId(), userRepo.findByUsername(username).getId());
  }

  public List<UserDtoOut> findByUsername(String username) {
    List<User> users = userRepo.searchByUsernameLike(username);
    return showAllUserWithUsername(users);
  }

  private List<UserDtoOut> showAllUserWithUsername(List<User> users) {
    return users
      .stream()
      .map(p->mapper.map(p,UserDtoOut.class))
      .peek(userDtoOut -> {
        userDtoOut.setUserFollowingCount(getFollowings(userDtoOut.getId()).size());
        userDtoOut.setUserFollowersCount(getFollowers(userDtoOut.getId()).size());
        userDtoOut.setUserTweetCount(getUserPosts(userDtoOut.getId(), 0, 1000000).size());// need to correct
      })
      .toList();
  }
}