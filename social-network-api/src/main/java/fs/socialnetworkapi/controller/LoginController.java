package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.dto.login.LoginDtoIn;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.service.AuthorizationService;
import fs.socialnetworkapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LoginController {

  private final UserService userService;
  private final AuthorizationService authorizationService;

  @PostMapping("api/v1/login")
  public ResponseEntity<?> login(@RequestBody LoginDtoIn loginDtoIn) {
    User userByEmail = userService.findByEmail(loginDtoIn.getEmail());
    return ResponseEntity.ok(authorizationService.tokenGenerate(loginDtoIn, userByEmail));

  }
}
