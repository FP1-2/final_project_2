package fs.socialnetworkapi.service;

import fs.socialnetworkapi.dto.password.PasswordResetRequest;
import fs.socialnetworkapi.dto.user.UserDtoIn;
import fs.socialnetworkapi.dto.user.UserDtoOut;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.exception.UserNotFoundException;
import fs.socialnetworkapi.repos.UserRepo;
import lombok.RequiredArgsConstructor;
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



  public UserDtoOut editUser(UserDtoIn userDtoIn) {
    User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    String email = user.getEmail();
    User userFromDb = userRepo.findByEmail(email);
    LocalDateTime createdDateUser = userFromDb.getCreatedDate();
    System.out.println(createdDateUser);
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
    user.setUsername(String.format("%s_%s", userDtoIn.getFirstName(), userDtoIn.getLastName()));
    return mapper.map(userRepo.save(user), UserDtoOut.class);
  }

  public UserDtoOut addUser(UserDtoIn userDtoIn) {
    User userFromDb = userRepo.findByEmail(userDtoIn.getEmail());

    if (userFromDb != null) {
      return mapper.map(userFromDb, UserDtoOut.class); // need to correct
    }

    userDtoIn.setActive(false);
    userDtoIn.setActivationCode(UUID.randomUUID().toString());
    userDtoIn.setPassword(passwordEncoder.encode(userDtoIn.getPassword()));
    userDtoIn.setRoles("USER");
    User user1 = userRepo.save(mapper.map(userDtoIn, User.class));
    if (userDtoIn.getEmail() != null) {
      String message = String.format(
        "Hello, %s! \n"
          + "Welcome to Twitter. Please, visit next link: http://twitterdanit.us-east-1.elasticbeanstalk.com/api/v1/activate/%s",
        userDtoIn.getFirstName(),
        userDtoIn.getActivationCode()
      );
      mailService.send(userDtoIn.getEmail(), "Activation code", message);
    }
    return mapper.map(user1, UserDtoOut.class);// need to correct
  }

  public boolean activateUser(String code) {
    User user = userRepo.findByActivationCode(code);
    if (user == null) {
      return false;
    }
    user.setRoles("USER");
    user.setActivationCode(null);
    user.setActive(true);
    userRepo.save(user);
    return true;
  }

  public void upgradeUser(User user) {
    userRepo.save(user);
  }

  public User findByEmail(String email) {
    return userRepo.findByEmail(email);
  }

  public User findByActivationCode(String activationCode) {
    return userRepo.findByActivationCode(activationCode);
  }

  public void subscribe(Long currentUserId, Long userId) {
    User currentUser = userRepo.findById(currentUserId)
            .orElseThrow(() -> new UserNotFoundException(String.format("User with id: %d not found", currentUserId)));
    User user = userRepo.findById(userId)
            .orElseThrow(() -> new UserNotFoundException(String.format("User with id: %d not found", userId)));

    user.getFollowers().add(currentUser);
    userRepo.save(user);
  }

  public void unsubscribe(Long currentUserId, Long userId) {
    User currentUser = userRepo.findById(currentUserId)
            .orElseThrow(() -> new UserNotFoundException(String.format("User with id: %d not found", currentUserId)));
    User user = userRepo.findById(userId)
            .orElseThrow(() -> new UserNotFoundException(String.format("User with id: %d not found", userId)));

    user.getFollowers().remove(currentUser);
    userRepo.save(user);
  }

  public List<UserDtoOut> getFollowers(Long currentUserId) {
    User currentUser = userRepo.findById(currentUserId)
            .orElseThrow(() -> new UserNotFoundException(String.format("User with id: %d not found", currentUserId)));

    return currentUser.getFollowers()
            .stream()
            .map(u -> mapper.map(u, UserDtoOut.class))
            .toList();
  }

  public List<UserDtoOut> getFollowings(Long currentUserId) {
    User currentUser = userRepo.findById(currentUserId)
            .orElseThrow(() -> new UserNotFoundException(String.format("User with id: %d not found", currentUserId)));

    return currentUser.getFollowings()
            .stream()
            .map(u -> mapper.map(u, UserDtoOut.class))
            .toList();
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return userRepo.findByEmail(username);
  }

  public boolean changePassword(PasswordResetRequest request) {
    User findUser = userRepo.findByActivationCode(request.getActivationCode());
    findUser.setPassword(passwordEncoder.encode(request.getNewPassword()));
    userRepo.save(findUser);
    return true;
  }
}
