package fs.socialnetworkapi.security;

import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.apache.tools.ant.types.resources.Tokens;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.Optional;
import java.util.Base64;

@Component
@RequiredArgsConstructor
public class SecurityService {

  private final PasswordEncoder passwordEncoder;
  private final UserService userService;

  @Value("${jwt.secret}")
  private String secret;
  @Value("${jwt.expiration}")
  private Integer expirationInSeconds;
  @Value("${jwt.issuer}")
  private String issuer;

  public TokenDetails authenticate(String email, String password) {
    User userByEmail = userService.findByEmail(email);
    return generateToken(userByEmail).toBuilder()
      .userId(userByEmail.getId())
      .build();

//    User userByEmail = userService.findByEmail(email);
//
//    if (passwordEncoder.matches(password, userByEmail.getPassword()) & userByEmail.isActive()) {
//      return generateToken(userByEmail).toBuilder()
//        .userId(userByEmail.getId())
//        .build();
//    } else {
//      return new TokenDetails();
//    }
  }

  private TokenDetails generateToken(User user) {
    Map<String,Object> claims = new HashMap<>();
    claims.put("roles",user.getRoles());
    claims.put("email", user.getEmail());
    claims.put(Claims.ID,user.getId().toString());

    return generateToken(claims, user.getEmail());
  }

  private TokenDetails generateToken(Map<String, Object> claims, String subject) {
    Long expirationTimeInMillis = expirationInSeconds * 1000L;
    LocalDateTime expirationDate = LocalDateTime.now().plusSeconds(expirationTimeInMillis);
    return generateToken(expirationDate, claims, subject);
  }

  private TokenDetails generateToken(LocalDateTime expirationDate, Map<String, Object> claims, String subject) {
    LocalDateTime createdDate = LocalDateTime.now();
    String token = Jwts.builder()
      .setClaims(claims)
      .setIssuer(issuer)
      .setSubject(subject)
      .setIssuedAt(Date.from(createdDate.atZone(ZoneId.systemDefault()).toInstant()))
      .setId(UUID.randomUUID().toString())
      .setExpiration(Date.from(expirationDate.atZone(ZoneId.systemDefault()).toInstant()))
      .signWith(SignatureAlgorithm.HS256, Base64.getEncoder().encodeToString(secret.getBytes()))
      .compact();


    return TokenDetails.builder()
      .token(token)
      .issuedAt(createdDate)
      .expiresAt(expirationDate)
      .build();

  }

  public Optional<Claims> getClaims(String token) {
    try {
      return Optional.of(Jwts.parser()
        .setSigningKey(Base64.getEncoder().encodeToString(secret.getBytes()))
        .parseClaimsJws(token)
        .getBody());
    } catch (JwtException ex) {
      return Optional.empty();
    }
  }

  public verificationResult check(String token) {
    Optional<Claims> claims = getClaims(token);

    if (claims.isEmpty() || claims.get().getExpiration().before(new Date())) {
      throw new RuntimeException("Token expired");
    }

    return new verificationResult(claims, token);
  }

  public record verificationResult(Optional<Claims> claims, String token) {

  }
}
