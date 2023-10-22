package fs.socialnetworkapi.service;

import fs.socialnetworkapi.dto.password.PasswordResetRequest;
import fs.socialnetworkapi.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordResetService {
  private final UserService userService;
  private final MailService mailService;
  private final PasswordEncoder encoder;

  @Value("${myapp.baseUrl}")
  private String baseUrl;

  public String generateActivationCode(User user) {
    String activationCode = UUID.randomUUID().toString();
    user.setActivationCode(activationCode);
    userService.saveUser(user);
    return activationCode;
  }

  public void sendActivationCode(User user) {
    String link = baseUrl + "/reset/confirm?code=" + generateActivationCode(user);
    String message = "To reset your password, click the following link: " + link;
    mailService.send(user.getEmail(), "Password Reset", message);
  }

  public boolean setNewActivationCode(String email) {
    User user = userService.findByEmail(email);
    if (user == null) {
      return false;
    }
    sendActivationCode(user);
    return true;
  }

  public User findByActivationCode(String activationCode) {
    return userService.findByActivationCode(activationCode);
  }

  public boolean changePassword(PasswordResetRequest request) {
    User user = findByActivationCode(request.getActivationCode());
    if (user == null) {
      return false;
    }
    user.setActivationCode(null);
    user.setPassword(encoder.encode(request.getNewPassword()));
    userService.saveUser(user);
    return true;
  }

}
