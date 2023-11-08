package fs.socialnetworkapi.service;

import fs.socialnetworkapi.dto.login.LoginDtoIn;
import fs.socialnetworkapi.dto.login.LoginDtoOut;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.security.SecurityService;
import fs.socialnetworkapi.security.TokenDetails;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.OAuth2RefreshToken;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Date;

@Service
@RequiredArgsConstructor
@Log4j2
public class AuthorizationService {

  private final UserService userService;
  private final SecurityService securityService;
  private final PasswordEncoder passwordEncoder;

  public LoginDtoOut tokenGenerate(@RequestBody LoginDtoIn loginDtoIn) {
    User userByEmail = userService.findByEmail(loginDtoIn.getEmail());
    if (passwordEncoder.matches(loginDtoIn.getPassword(), userByEmail.getPassword()) & userByEmail.isActive()) {
      TokenDetails tokenDetails = securityService.authenticate(loginDtoIn.getEmail());
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