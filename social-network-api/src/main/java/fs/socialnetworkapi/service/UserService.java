package fs.socialnetworkapi.service;

import fs.socialnetworkapi.dto.post.PostDtoOut;
import fs.socialnetworkapi.dto.user.UserDtoIn;
import fs.socialnetworkapi.dto.user.UserDtoOut;
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

  private User findById(Long userId) {
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

    user.setUserFollowingCount(getFollowings(userId).size());
    user.setUserFollowersCount(getFollowers(userId).size());
    user.setUserTweetCount(getUserPosts(userId, 0, 1000000).size());// need to correct

    return mapper.map(user, UserDtoOut.class);
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
    User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    String email = user.getEmail();
    User userFromDb = userRepo.findByEmail(email);
    LocalDateTime createdDateUser = userFromDb.getCreatedDate();
    user.setFirstName(userDtoIn.getFirstName());
    user.setLastName(userDtoIn.getLastName());
    user.setBirthday(userDtoIn.getBirthday());
    user.setMainPhoto(userDtoIn.getMainPhoto());
    user.setAvatar(userDtoIn.getAvatar());
    user.setPassword(passwordEncoder.encode(userDtoIn.getPassword()));
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

  public void upgradeUser(User user) {
    userRepo.save(user);
  }

  public void subscribe(Long currentUserId, Long userId) {
    User currentUser = findById(currentUserId);
    User user = findById(userId);
    user.getFollowers().add(currentUser);
    saveUser(user);
  }

  public void unsubscribe(Long currentUserId, Long userId) {
    User currentUser = findById(currentUserId);
    User user = findById(userId);
    user.getFollowers().remove(currentUser);
    saveUser(user);
  }

  public List<UserDtoOut> getFollowers(Long currentUserId) {
    return findById(currentUserId).getFollowers()
            .stream()
            .map(u -> mapper.map(u, UserDtoOut.class))
            .toList();
  }

  public List<UserDtoOut> getFollowings(Long currentUserId) {
    return findById(currentUserId).getFollowings()
            .stream()
            .map(u -> mapper.map(u, UserDtoOut.class))
            .toList();
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return findByEmail(username);
  }

}