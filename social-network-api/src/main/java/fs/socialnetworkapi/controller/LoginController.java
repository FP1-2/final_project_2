package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.dto.login.LoginDtoIn;
import fs.socialnetworkapi.service.AuthorizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LoginController {

  private final AuthorizationService authorizationService;

  @PostMapping("api/v1/login")
  public ResponseEntity<?> login(@RequestBody LoginDtoIn loginDtoIn) {
    return ResponseEntity.ok(authorizationService.tokenGenerate(loginDtoIn));

  }
}
