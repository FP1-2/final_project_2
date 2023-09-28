package fs.socialnetworkapi.service;

import fs.socialnetworkapi.dto.Mapper;
import fs.socialnetworkapi.dto.user.UserDtoIn;
import fs.socialnetworkapi.dto.user.UserDtoOut;
import fs.socialnetworkapi.entity.RoleEntity;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.exception.UserNotFoundException;
import fs.socialnetworkapi.repos.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepo userRepo;
  private final MailService mailService;
  private final Mapper mapper;
  private final PasswordEncoder passwordEncoder;

  public UserDtoOut addUser(UserDtoIn userDtoIn) {
    User userFromDb = userRepo.findByEmail(userDtoIn.getEmail());
    if (userFromDb != null) {
      return mapper.map(userFromDb); // need to correct
    }

    userDtoIn.setActive(false);
    userDtoIn.setActivationCode(UUID.randomUUID().toString());
    userDtoIn.setPassword(passwordEncoder.encode(userDtoIn.getPassword()));
//    userDtoIn.setRoles(Collections.singleton(new RoleEntity(2L, "ROLE_USER")));
    User user1 = userRepo.save(mapper.map(userDtoIn));
    if (userDtoIn.getEmail() != null) {
      String message = String.format(
        "Hello, %s! \n"
          + "Welcome to Twitter. Please, visit next link: http://twitterdanit.us-east-1.elasticbeanstalk.com/api/v1/activate/%s",
        userDtoIn.getFirstName(),
        userDtoIn.getActivationCode()
      );
      mailService.send(userDtoIn.getEmail(), "Activation code", message);
    }
    return mapper.map(user1);// need to correct
  }

  public boolean activateUser(String code) {
    User user = userRepo.findByActivationCode(code);
    if (user == null) {
      return false;
    }
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
}
