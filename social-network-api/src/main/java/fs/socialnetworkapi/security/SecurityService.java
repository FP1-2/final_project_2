package fs.socialnetworkapi.security;

import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.exception.UnauthorizedException;
import fs.socialnetworkapi.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Base64;

@Log4j2
@Component
@RequiredArgsConstructor
@Service
public class SecurityService {

  private final UserService userService;

  @Value("${jwt.secret}")
  private String secret;
  @Value("${jwt.expiration}")
  private Integer expirationInSeconds;
  @Value("${jwt.issuer}")
  private String issuer;



  public TokenDetails authenticate(String email) {
    User userByEmail = userService.findByEmail(email);
    return generateToken(userByEmail).toBuilder()
      .userId(userByEmail.getId())
      .build();
  }

  public TokenDetails generateToken(User user) {
    Map<String,Object> claims = new HashMap<>();
    claims.put("roles",user.getRoles());
    claims.put("email", user.getEmail());
    claims.put(Claims.ID,user.getId().toString());

    return generateToken(claims, user.getEmail());
  }

  private TokenDetails generateToken(Map<String, Object> claims, String subject) {
    long expirationTimeInMillis = expirationInSeconds * 1000L;
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
      throw new UnauthorizedException("Unauthorized access: Token expired");
    }
    return new verificationResult(claims, token);
  }

  public record verificationResult(Optional<Claims> claims, String token) {
  }

}
