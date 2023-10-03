package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.dto.login.LoginDtoIn;
import fs.socialnetworkapi.dto.login.LoginDtoOut;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.repos.UserRepo;
import fs.socialnetworkapi.security.SecurityService;
import fs.socialnetworkapi.security.TokenDetails;
import fs.socialnetworkapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
public class LoginController {

  private final SecurityService securityService;
  private final PasswordEncoder passwordEncoder;
  private final UserService userService;
  private final UserRepo userRepo;

  @PostMapping("api/v1/login")
  public LoginDtoOut login(@RequestBody LoginDtoIn loginDtoIn) {
    User userByEmail = userService.findByEmail(loginDtoIn.getEmail());
    LocalDateTime createdDate = LocalDateTime.now();
    if (passwordEncoder.matches(loginDtoIn.getPassword(), userByEmail.getPassword()) & userByEmail.isActive()) {
      TokenDetails tokenDetails = securityService.authenticate(loginDtoIn.getEmail(), loginDtoIn.getPassword());
      return LoginDtoOut
        .builder()
        .id(tokenDetails.getUserId())
        .token(tokenDetails.getToken())
        .expiresAt(tokenDetails.getExpiresAt())
        .issueAt(tokenDetails.getIssuedAt())
        .build();
    }

    return LoginDtoOut
      .builder()
      .error("wrong user/password combination")
      .build();

  }

}
