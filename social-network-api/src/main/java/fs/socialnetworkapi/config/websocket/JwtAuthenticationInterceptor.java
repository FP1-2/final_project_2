package fs.socialnetworkapi.config.websocket;

import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.security.SecurityService;
import fs.socialnetworkapi.security.UserAuthenticationBearer;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class JwtAuthenticationInterceptor implements ChannelInterceptor {

  @Autowired
  private SecurityService tokenService;

  @Override
  public Message<?> preSend(Message<?> message, MessageChannel channel) {

    StompHeaderAccessor accessor =  MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
    if (accessor ==  null) {
      return message;
    }
    if (StompCommand.CONNECT.equals(accessor.getCommand())
        || StompCommand.SEND.equals(accessor.getCommand()) ) {

      System.out.println("preSend");
      Optional<String> token = extractTokenFromStompHeaders(accessor);

      Optional<SecurityService.verificationResult> verificationResult = token.map(tokenService::check);
      Optional<UsernamePasswordAuthenticationToken> usernamePasswordAuthenticationToken = verificationResult
              .map(UserAuthenticationBearer::create);

      if (usernamePasswordAuthenticationToken.isPresent()) {
        UsernamePasswordAuthenticationToken at = usernamePasswordAuthenticationToken.get();
        SecurityContextHolder.getContext().setAuthentication(at);
        accessor.setUser(at);
      } else {
        User user = new User();
        UsernamePasswordAuthenticationToken at = new UsernamePasswordAuthenticationToken(user,null,
                user.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(at);
        accessor.setUser(at);
      }
    }

    return message;
  }

  private Optional<String> extractTokenFromStompHeaders(StompHeaderAccessor accessor) {

    String token = accessor.getFirstNativeHeader("Authorization");

    return (token == null) ? Optional.empty() : Optional.of(token);

  }
}
