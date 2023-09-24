package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.dto.login.LoginDtoIn;
import fs.socialnetworkapi.dto.login.LoginDtoOut;
import fs.socialnetworkapi.security.SecurityService;
import fs.socialnetworkapi.security.TokenDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LoginController {

  private final SecurityService securityService;
  @PostMapping("api/v1/login")
  public LoginDtoOut login(@RequestBody LoginDtoIn loginDtoIn){

    TokenDetails tokenDetails = securityService.authenticate(loginDtoIn.getEmail(), loginDtoIn.getPassword());
    System.out.println(tokenDetails);

    return LoginDtoOut
      .builder()
      .id(tokenDetails.getUserId())
      .token(tokenDetails.getToken())
      .expiresAt(tokenDetails.getExpiresAt())
      .issueAt(tokenDetails.getIssuedAt())
      .build();
  }
}
