package fs.socialnetworkapi.config.websocket;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  @Override
  public void configureMessageBroker(MessageBrokerRegistry config) {

    config.enableSimpleBroker("/topic");

    // цей префікс повинен бути перед всіма едпоінтами,
    // які відправляються в spring
    config.setApplicationDestinationPrefixes("/app");

    //config.setUserDestinationPrefix("/user");
  }

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    // http://localhost:5000/api/ws
    // адрес для підключення до веб сокета
    registry.addEndpoint("/api/ws").setAllowedOriginPatterns("*").withSockJS();

  }

  @Override
  public void configureClientInboundChannel(ChannelRegistration registration) {
    registration.interceptors(authInterceptor());
  }

  @Bean
  public JwtAuthenticationInterceptor authInterceptor() {
    return new JwtAuthenticationInterceptor();
  }
}
