package fs.socialnetworkapi.service;

import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.repos.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepo userRepo;
  private final MailService mailService;

  public boolean addUser(User user) {
    User userFromDb = userRepo.findByEmail(user.getEmail());
    if (userFromDb != null) {
      return false;
    }
    user.setActive(true);
    user.setActivationCode(UUID.randomUUID().toString());
    userRepo.save(user);
    //    if (!StringUtils.isEmpty(user.getEmail())) {
    if (user.getEmail() != null) {
      String message = String.format(
          "Hello, %s! \n"
            + "Welcome to Twitter. Please, visit next link: http://localhost:5000/activate/%s",
          user.getFirstName(),
          user.getActivationCode()
      );
      mailService.send(user.getEmail(), "Activation code", message);
    }
    return true;
  }

  public boolean activateUser(String code) {
    User user = userRepo.findByActivationCode(code);
    if (user == null) {
      return false;
    }
    user.setActivationCode(null);
    userRepo.save(user);
    return true;
  }

  public boolean upgradeUser(User user) {
    throw new RuntimeException();
  }

  public User findByEmail(String email) {
    return userRepo.findByEmail(email);
  }

  public User findByActivationCode(String activationCode) {
    return userRepo.findByActivationCode(activationCode);
  }

}
