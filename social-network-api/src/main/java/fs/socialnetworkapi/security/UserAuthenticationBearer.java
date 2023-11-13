package fs.socialnetworkapi.security;

import fs.socialnetworkapi.entity.User;
import io.jsonwebtoken.Claims;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;

import java.util.List;


public class UserAuthenticationBearer {

  public static UsernamePasswordAuthenticationToken create(SecurityService.verificationResult verificationResult ) {
    if (verificationResult.claims().isEmpty()) {
      return new UsernamePasswordAuthenticationToken(new User(), null, new ArrayList<SimpleGrantedAuthority>());
    }

    Claims claims = verificationResult.claims().get();
    String email = claims.getSubject();
    String roles = claims.get("roles", String.class);
    String username = claims.get("username", String.class);

    long principalId = Long.parseLong(claims.get(Claims.ID).toString());
    User principal = new User();
    principal.setId(principalId);
    principal.setEmail(email);
    principal.setUsername(username);

    List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(roles));

    return new UsernamePasswordAuthenticationToken(principal,null, authorities);
  }
}
