package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.dto.EmailRequest;
import fs.socialnetworkapi.dto.login.LoginDtoIn;
import fs.socialnetworkapi.dto.password.PasswordResetRequest;
import fs.socialnetworkapi.dto.user.UserDtoIn;
import fs.socialnetworkapi.dto.user.UserDtoOut;
import fs.socialnetworkapi.service.AuthorizationService;
import fs.socialnetworkapi.service.PasswordResetService;
import fs.socialnetworkapi.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/")
public class UserController {

  private final UserService userService;
  private final AuthorizationService authorizationService;
  private final PasswordResetService passwordResetService;

  @GetMapping("subscribe/{subscribe_user_id}")
  public ResponseEntity<?> subscribe(@PathVariable("subscribe_user_id") Long userId) {
    userService.subscribe(userId);
    return ResponseEntity.ok().build();
  }

  @GetMapping("unsubscribe/{subscribe_user_id}")
  public ResponseEntity<?> unsubscribe(@PathVariable("subscribe_user_id") Long userId) {
    userService.unsubscribe(userId);
    return ResponseEntity.ok().build();
  }

  @GetMapping("followers/{user_id}") //підписчики
  public ResponseEntity<List<UserDtoOut>> getFollowers(@PathVariable(value = "user_id") Long userId) {
    List<UserDtoOut> followers = userService.getFollowersDto(userId);
    return ResponseEntity.ok(followers);
  }

  @GetMapping("followings/{user_id}") //підписки
  public ResponseEntity<List<UserDtoOut>> getFollowings(@PathVariable(value = "user_id") Long userId) {
    List<UserDtoOut> followings = userService.getFollowingsDto(userId);
    return ResponseEntity.ok(followings);
  }

  @GetMapping("user/info/{user_id}")
  public ResponseEntity<?> userInfo(@PathVariable("user_id") Long userId) {
    return ResponseEntity.ok(userService.showUser(userId));
  }

  @PostMapping("edit")
  public ResponseEntity<UserDtoOut> edit(@Valid @RequestBody UserDtoIn userDtoIn) {
    if (userService.isUsernameUnique(userDtoIn.getUsername())) {
      return ResponseEntity.ok(userService.editUser(userDtoIn));
    }
    return ResponseEntity.status(409).build();
  }

  @GetMapping("username-checker/{username}")
  public boolean usernameChecker(@PathVariable String username) {
    return userService.isUsernameUnique(username);
  }

  @PostMapping("login")
  public ResponseEntity<?> login(@RequestBody LoginDtoIn loginDtoIn) {
    return ResponseEntity.ok(authorizationService.tokenGenerate(loginDtoIn));
  }

  @PostMapping("registration")
  public ResponseEntity<UserDtoOut> createNewUser(@Valid @RequestBody UserDtoIn userDtoIn) {
    return ResponseEntity.ok(userService.addUser(userDtoIn));
  }

  @GetMapping("find-user/{username}")
  public List<UserDtoOut> findUser(@PathVariable String username) {
    return userService.findByUsername(username);
  }

  @GetMapping("activate/{code}")
  public ResponseEntity<String> activate(HttpServletResponse response, @PathVariable String code) throws IOException {
    boolean isActivated = userService.activateUser(code);
    if (isActivated) {
      response.sendRedirect("/signIn");
    } else {
      response.sendRedirect("/");
    }
    return ResponseEntity.ok().build();
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

  @GetMapping("find-popular-user")
  public List<UserDtoOut> findPopularUser() {
    return userService.findPopularUser();
  }
}