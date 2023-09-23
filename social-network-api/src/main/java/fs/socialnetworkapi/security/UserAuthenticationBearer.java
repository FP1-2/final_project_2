package fs.socialnetworkapi.security;

import fs.socialnetworkapi.entity.User;
import io.jsonwebtoken.Claims;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.stream.Collectors;

public class UserAuthenticationBearer {

    public static UsernamePasswordAuthenticationToken create(SecurityService.VerificationResult verificationResult ){
        if (verificationResult.claims().isEmpty())
            return new UsernamePasswordAuthenticationToken(new User(),null, new ArrayList<SimpleGrantedAuthority>());

        Claims claims = verificationResult.claims().get();
        String email = claims.getSubject();

        ArrayList<LinkedHashMap<String,String>> roles     = claims.get("roles", ArrayList.class);
        String role = roles.stream()
                .map(r->r.get("email"))
                .collect(Collectors.joining());
//        String email = claims.getSubject();

        List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(role));

        long principalId = Long.parseLong(claims.getId());
        User principal = new User();
        principal.setId(principalId);
        principal.setEmail(email);


        return new UsernamePasswordAuthenticationToken(principal,null, authorities);
    }
}
