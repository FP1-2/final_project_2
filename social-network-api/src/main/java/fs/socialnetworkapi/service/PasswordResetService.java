package fs.socialnetworkapi.service;

import fs.socialnetworkapi.component.AppLink;
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
  @Autowired
  private final AppLink appLink;

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
    String link = appLink.getBaseUrl() + "/reset/confirm?code=" + generateActivationCode(user);
    String message = "To reset your password, click the following link: " + link;
    mailService.send(user.getEmail(), "Password Reset", message);
  }

  public boolean setNewActivationCode(String email) {
    Optional<User> findUser = findByEmail(email);
    if (findUser.isEmpty()) {
      return false;
    }
    sendActivationCode(findUser.get());
    return true;
  }

  public Optional<User> findByActivationCode(String activationCode) {
    return Optional.of(userService.findByActivationCode(activationCode));
  }

  public void setNewPassword(User user, String newPassword) {
    user.setPassword(newPassword);
    userService.upgradeUser(user);
  }

  public boolean changePassword(String activationCode, String newPassword) {
    Optional<User> findUser = findByActivationCode(activationCode);
    if (findUser.isEmpty()) {
      return false;
    }
    setNewPassword(findUser.get(), newPassword);
    return true;
  }

}
