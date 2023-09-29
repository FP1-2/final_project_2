package fs.socialnetworkapi.security;

import fs.socialnetworkapi.entity.User;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Log4j2
@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

  private static final String BEARER = "Bearer ";
  private static final String AUTH_HEADER = HttpHeaders.AUTHORIZATION;

  private final SecurityService tokenService;

  private Optional<String> extractTokenFromRequest(HttpServletRequest rq) {
    return Optional.ofNullable(rq.getHeader(AUTH_HEADER))
            .filter(h -> h.startsWith(BEARER))
            .map(h -> h.substring(BEARER.length()));
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
    throws ServletException, IOException {
    try {
      Optional<String> token = extractTokenFromRequest(request);
      Optional<SecurityService.verificationResult> verificationResult = token.map(tokenService::check);
      Optional<UsernamePasswordAuthenticationToken> usernamePasswordAuthenticationToken = verificationResult
              .map(UserAuthenticationBearer::create);
      if (usernamePasswordAuthenticationToken.isPresent()) {
        UsernamePasswordAuthenticationToken at = usernamePasswordAuthenticationToken.get();
        at.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(at);
      } else {
        //Якщо не має токена, тоді передаємо пустого юзера
        User user = new User();
        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(user,null,
          user.getAuthorities()));
        //response.setStatus(403);
      }
      filterChain.doFilter(request, response);
    } catch (Exception x) {
      response.setStatus(403);
      filterChain.doFilter(request, response);
    }

  }

}
