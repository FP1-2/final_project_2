package fs.socialnetworkapi.dto.login;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder(toBuilder = true)
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class LoginDtoOut {

  private Long id;
  private String token;
  private LocalDateTime issueAt;
  private LocalDateTime expiresAt;
  private String error;
}