package fs.socialnetworkapi.security;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebConfigSecurity {

  @Value("${jwt.secret}")
  private String secret;
  private final JwtFilter jwtFilter;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

    http.csrf(AbstractHttpConfigurer::disable);
    http.authorizeHttpRequests((authorizeHttpRequests) ->
        authorizeHttpRequests

          .requestMatchers(HttpMethod.OPTIONS,"/**").permitAll()
          .requestMatchers("/api/v1/registration").permitAll()
          .requestMatchers("/h2/**").permitAll()
          .requestMatchers("/api/v1/login").permitAll()
          .requestMatchers("/api/v1/activate/**").permitAll()
          .requestMatchers("/api/v1/all-posts").permitAll()
          .requestMatchers("/api/v1/reset/**").permitAll()
          .requestMatchers("/error").permitAll()
          .requestMatchers("/oauth2/google").permitAll()
          .requestMatchers(HttpMethod.DELETE,"api/v1/**").hasAuthority("USER")
          .requestMatchers(HttpMethod.PUT,"api/v1/**").hasAuthority("USER")
          .requestMatchers(HttpMethod.GET,"api/v1/**").hasAuthority("USER")
          .requestMatchers(HttpMethod.POST,"api/v1/**").hasAuthority("USER")

//          .anyRequest().authenticated()

      )

//      .formLogin(Customizer.withDefaults())
//      .oauth2Login(Customizer.withDefaults());
      .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

  @Bean
  public WebSecurityCustomizer webSecurityCustomizer() {
    return (WebSecurity web)-> web.ignoring()
      .requestMatchers(new AntPathRequestMatcher("/h2/**"))
      .requestMatchers(new AntPathRequestMatcher("/swagger-ui/**"))
      .requestMatchers(new AntPathRequestMatcher("/v3/api-docs/**"))
      .requestMatchers(new AntPathRequestMatcher("/index*"))
      .requestMatchers(new AntPathRequestMatcher("/static/**"))
      .requestMatchers(new AntPathRequestMatcher("/"))
      .requestMatchers(new AntPathRequestMatcher("/*.js"))
      .requestMatchers(new AntPathRequestMatcher("/*.json"))
      .requestMatchers(new AntPathRequestMatcher("/*.ico"))
      .requestMatchers(new AntPathRequestMatcher("/#/**"))
      ;
  }

  @Bean
  public WebSecurityCustomizer webSecurityCustomizerDebug() {
    return (WebSecurity web) -> web.debug(true);
  }

}
