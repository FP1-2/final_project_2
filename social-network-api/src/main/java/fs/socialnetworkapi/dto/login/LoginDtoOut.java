package fs.socialnetworkapi.dto.login;

import lombok.*;

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


