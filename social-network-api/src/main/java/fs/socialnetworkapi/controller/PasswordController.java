package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.dto.EmailRequest;
import fs.socialnetworkapi.dto.PasswordResetRequest;
import fs.socialnetworkapi.service.PasswordResetService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/reset")
public class PasswordController {

  @Autowired
  private final PasswordResetService passwordResetService;

  @PostMapping("/request")
  public ResponseEntity<?> requestPasswordReset(@RequestBody EmailRequest email) {
    return passwordResetService.setNewActivationCode(email.getEmail())
            ? ResponseEntity.ok().build()
            : ResponseEntity.badRequest().body("No such email");
  }

  @PostMapping("/confirm")
  public ResponseEntity<?> confirmPasswordReset(@RequestBody PasswordResetRequest request) {
    return passwordResetService.changePassword(request.getActivationCode(), request.getNewPassword())
            ? ResponseEntity.ok().build()
            : ResponseEntity.badRequest().body("Try again");
  }

}
