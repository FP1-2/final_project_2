package fs.socialnetworkapi.security;

import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.service.UserService;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

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

  private TokenDetails generateToken(User user){
    Map<String,Object> claims = new HashMap<>();
    claims.put("roles",user.getRoles());
    // climes.put("role","ROLE_USER");
    claims.put("email", user.getEmail());
    claims.put(Claims.ID,user.getId().toString());

    return generateToken1(claims, user.getEmail());
  }
  private TokenDetails generateToken1(Map<String, Object> claims, String subject){
    Long expirationTimeInMillis = expirationInSeconds * 1000L;
    LocalDateTime expirationDate = LocalDateTime.now().plusSeconds(expirationTimeInMillis);

    return generateToken2(expirationDate, claims, subject);
  }
  private TokenDetails generateToken2(LocalDateTime expirationDate, Map<String, Object> claims, String subject){
    LocalDateTime createdDate = LocalDateTime.now();
    //        String token = Jwts.builder()
//                .setClaims(claims)
//                .setIssuer(issuer)
////                .setSubject(subject)
//                .setIssuedAt(Date.from(createdDate.atZone(ZoneId.systemDefault()).toInstant()))
//               // .setId(UUID.randomUUID().toString())
//                .setExpiration(Date.from(expirationDate.atZone(ZoneId.systemDefault()).toInstant()))
////                .signWith(SignatureAlgorithm.HS256, Base64.getEncoder().encodeToString(secret.getBytes()))
//                .compact();

    String token = Jwts.builder()
      .setSubject(subject)
      .compact();

    return TokenDetails.builder()
      .token(token)
      .issuedAt(createdDate)
      .expiresAt(expirationDate)
      .build();

  }
  public TokenDetails authenticate(String email, String password) {
    User userByEmail = userService.findByEmail(email);
    if (Objects.equals(password, userByEmail.getPassword())){
//        if (passwordEncoder.matches(password, userByEmail.getPassword())){
      System.out.println("12");
      return generateToken(userByEmail).toBuilder()
        .userId(userByEmail.getId())
        .build();
    }else{
      System.out.println("13");
      return new TokenDetails();
    }

  }
  public Optional<Claims> getClaims(String token){
    try {
      return Optional.of(Jwts.parser()
        .setSigningKey(Base64.getEncoder().encodeToString(secret.getBytes()))
        .parseClaimsJws(token)
        .getBody());
    }catch (JwtException ex){
      return Optional.empty();
    }
  }
  public VerificationResult check(String token){
    Optional<Claims> claims = getClaims(token);

    if (claims.isEmpty() || claims.get().getExpiration().before(new Date())) {
      throw new RuntimeException("Token expired");
    }

    return new VerificationResult(claims, token);
  }

  public static record VerificationResult(Optional<Claims> claims, String token){

  }
}
