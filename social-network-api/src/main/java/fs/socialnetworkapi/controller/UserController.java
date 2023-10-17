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

  @GetMapping("followers") //підписчики
  public ResponseEntity<List<UserDtoOut>> getFollowers() {
    List<UserDtoOut> followers = userService.getFollowers();
    return ResponseEntity.ok(followers);
  }

  @GetMapping("followings") //підписки
  public ResponseEntity<List<UserDtoOut>> getFollowings() {
    List<UserDtoOut> followings = userService.getFollowings();
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
  public ResponseEntity<UserDtoOut> create(@Valid @RequestBody UserDtoIn userDtoIn) {
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
  public ResponseEntity<?> requestPasswordReset(@RequestBody EmailRequest email) {
    return passwordResetService.setNewActivationCode(email.getEmail())
      ? ResponseEntity.ok().build()
      : ResponseEntity.badRequest().body("No such email");
  }

  @PostMapping("reset/confirm")
  public ResponseEntity<?> confirmPasswordReset(@RequestBody PasswordResetRequest request) {
    return passwordResetService.changePassword(request)
      ? ResponseEntity.ok().build()
      : ResponseEntity.badRequest().body("Try again");
  }

}