package fs.socialnetworkapi.service;

import fs.socialnetworkapi.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordResetService {
  @Autowired
  private final UserService userService;
  @Autowired
  private final MailService mailService;

  public Optional<User> findByEmail(String email) {
    return Optional.of(userService.findByEmail(email));
  }

  public String generateActivationCode(User user) {
    String activationCode = UUID.randomUUID().toString();
    user.setActivationCode(activationCode);
    userService.upgradeUser(user);
    return activationCode;
  }

  public void sendActivationCode(User user) {
    String link = "http://twitterdemo.us-east-1.elasticbeanstalk.com/reset/confirm?code=" + generateActivationCode(user);
    String message = "To reset your password, click the following link: " + link;
    mailService.send(user.getEmail(), "Password Reset", message);
  }

  public void setNewActivationCode(String email) {
    findByEmail(email).ifPresent(this::sendActivationCode);
  }

  public Optional<User> findByActivationCode(String activationCode) {
    return Optional.of(userService.findByActivationCode(activationCode));
  }

  public void setNewPassword(User user, String newPassword) {
    user.setPassword(newPassword);
    userService.upgradeUser(user);
  }

  public void changePassword(String activationCode, String newPassword) {
    Optional<User> user = findByActivationCode(activationCode);
    user.ifPresent(value -> setNewPassword(value, newPassword));
  }

}
