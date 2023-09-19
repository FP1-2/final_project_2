package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.entity.PasswordResetRequest;
import fs.socialnetworkapi.service.PasswordResetService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reset")
public class PasswordController {

  @Autowired
  private final PasswordResetService passwordResetService;

  @PostMapping("/request")
  public void requestPasswordReset(@RequestBody String email) {
    passwordResetService.setNewActivationCode(email);
  }

  @PostMapping("/confirm")
  public void confirmPasswordReset(@RequestBody PasswordResetRequest request) {
    passwordResetService.changePassword(request.getActivationCode(), request.getNewPassword());
  }

}
