package fs.socialnetworkapi.service;

import fs.socialnetworkapi.dto.login.LoginDtoIn;
import fs.socialnetworkapi.dto.login.LoginDtoOut;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.security.SecurityService;
import fs.socialnetworkapi.security.TokenDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;


@Service
@RequiredArgsConstructor
@Log4j2
public class AuthorizationService {

  private final UserService userService;
  private final SecurityService securityService;
  private final PasswordEncoder passwordEncoder;

  public LoginDtoOut tokenGenerate(@RequestBody LoginDtoIn loginDtoIn) {
    User userByEmail = userService.findByEmail(loginDtoIn.getEmail().toLowerCase());
    if (passwordEncoder.matches(loginDtoIn.getPassword(), userByEmail.getPassword()) & userByEmail.isActive()) {
      TokenDetails tokenDetails = securityService.authenticate(loginDtoIn.getEmail().toLowerCase());
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