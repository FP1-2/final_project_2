package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.dto.EmailRequest;
import fs.socialnetworkapi.dto.login.LoginDtoIn;
import fs.socialnetworkapi.dto.password.PasswordResetRequest;
import fs.socialnetworkapi.dto.user.UserDtoIn;
import fs.socialnetworkapi.dto.user.UserDtoOut;
import fs.socialnetworkapi.service.AuthorizationService;
import fs.socialnetworkapi.service.PasswordResetService;
import fs.socialnetworkapi.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/")
public class UserController {

  private final UserService userService;
  private final AuthorizationService authorizationService;
  private final PasswordResetService passwordResetService;

  @GetMapping("user/{current_user_id}/subscribe/{user_id}")
  public ResponseEntity<?> subscribe(@PathVariable("current_user_id") Long currentUserId,
                                     @PathVariable("user_id") Long userId) {
    userService.subscribe(currentUserId, userId);
    return ResponseEntity.ok().build();
  }

  @GetMapping("user/{current_user_id}/unsubscribe/{user_id}")
  public ResponseEntity<?> unsubscribe(@PathVariable("current_user_id") Long currentUserId,
                                     @PathVariable("user_id") Long userId) {
    userService.unsubscribe(currentUserId, userId);
    return ResponseEntity.ok().build();
  }

  @GetMapping("user/{current_user_id}/followers") //підписчики
  public ResponseEntity<List<UserDtoOut>> getFollowers(@PathVariable("current_user_id") Long currentUserId) {
    List<UserDtoOut> followers = userService.getFollowers(currentUserId);
    return ResponseEntity.ok(followers);
  }

  @GetMapping("user/{current_user_id}/followings") //підписки
  public ResponseEntity<List<UserDtoOut>> getFollowings(@PathVariable("current_user_id") Long currentUserId) {
    List<UserDtoOut> followings = userService.getFollowings(currentUserId);
    return ResponseEntity.ok(followings);
  }

  @GetMapping("user/info/{user_id}")
  public ResponseEntity<?> userInfo(@PathVariable("user_id") Long userId) {
    return ResponseEntity.ok(userService.showUser(userId));
  }

  @PostMapping("edit")
  public ResponseEntity<UserDtoOut> edit(@Valid @RequestBody UserDtoIn userDtoIn ) {
    return ResponseEntity.ok(userService.editUser(userDtoIn));
  }

  @PostMapping("login")
  public ResponseEntity<?> login(@RequestBody LoginDtoIn loginDtoIn) {
    return ResponseEntity.ok(authorizationService.tokenGenerate(loginDtoIn));
  }

  @PostMapping("registration")
  public ResponseEntity<UserDtoOut> createNewUser(@Valid @RequestBody UserDtoIn userDtoIn) {
    return ResponseEntity.ok(userService.addUser(userDtoIn));
  }

  @GetMapping("activate/{code}")
  public ResponseEntity<Model> activate(Model model, @PathVariable String code) {
    boolean isActivated = userService.activateUser(code);

    if (isActivated) {
      model.addAttribute("message", "User successfully activated");
    } else {
      model.addAttribute("message", "Activation code is not found!");
    }
    return ResponseEntity.ok(model);
  }

  @PostMapping("reset/request")
  public ResponseEntity<String> requestPasswordReset(@RequestBody EmailRequest email) {
    return passwordResetService.setNewActivationCode(email.getEmail())
      ? ResponseEntity.ok().build()
      : ResponseEntity.internalServerError().body("Email check failed");
  }

  @PostMapping("reset/confirm")
  public ResponseEntity<String> confirmPasswordReset(@RequestBody PasswordResetRequest request) {
    return passwordResetService.changePassword(request)
      ? ResponseEntity.ok().build()
      : ResponseEntity.badRequest().body("Password reset failed");
  }

}