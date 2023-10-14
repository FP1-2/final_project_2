package fs.socialnetworkapi.service;

import fs.socialnetworkapi.dto.Mapper;
import fs.socialnetworkapi.dto.user.UserDtoIn;
import fs.socialnetworkapi.dto.user.UserDtoOut;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.exception.UserNotFoundException;
import fs.socialnetworkapi.repos.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
  private final UserRepo userRepo;
  private final MailService mailService;
  private final Mapper mapper;
  private final PasswordEncoder passwordEncoder;

  public UserDtoOut editUser(UserDtoIn userDtoIn, String email) {

    User user = userRepo.findByEmail(email);
    if (user.isLoginStatus()) {
      user.setFirstName(userDtoIn.getFirstName());
      user.setLastName(userDtoIn.getLastName());
      user.setBirthday(userDtoIn.getBirthday());
      user.setMainPhoto(userDtoIn.getMainPhoto());
      user.setAvatar(userDtoIn.getAvatar());
      user.setPassword(passwordEncoder.encode(userDtoIn.getPassword()));
      user.setAddress(userDtoIn.getAddress());
      user.setUsername(String.format("%s_%s", userDtoIn.getFirstName(), userDtoIn.getLastName()));
      return mapper.map(userRepo.save(user));
    }
    return null;
  }


  public UserDtoOut addUser(UserDtoIn userDtoIn) {
    User userFromDb = userRepo.findByEmail(userDtoIn.getEmail());

    if (userFromDb != null) {
      return mapper.map(userFromDb);
    }

    userDtoIn.setActive(false);
    userDtoIn.setActivationCode(UUID.randomUUID().toString());
    userDtoIn.setPassword(passwordEncoder.encode(userDtoIn.getPassword()));
    userDtoIn.setRoles("USER");
    userDtoIn.setLoginStatus(false);
    User user1 = userRepo.save(mapper.map(userDtoIn));
    if (userDtoIn.getEmail() != null) {
      String message = String.format(
        "Hello, %s! \n"
          + "Welcome to Twitter. Please, visit next link: http://twitterdanit.us-east-1.elasticbeanstalk.com/api/v1/activate/%s",
          // + "Welcome to Twitter. Please, visit next link: http://localhost:5000/api/v1/activate/%s",
        userDtoIn.getFirstName(),
        userDtoIn.getActivationCode()
      );
      mailService.send(userDtoIn.getEmail(), "Activation code", message);
    }
    return mapper.map(user1);
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
            .map(mapper::map)
            .toList();
  }

  public List<UserDtoOut> getFollowings(Long currentUserId) {
    User currentUser = userRepo.findById(currentUserId)
            .orElseThrow(() -> new UserNotFoundException(String.format("User with id: %d not found", currentUserId)));

    return currentUser.getFollowings()
            .stream()
            .map(mapper::map)
            .toList();
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return userRepo.findByEmail(username);
  }
}
