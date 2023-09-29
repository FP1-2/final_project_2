package fs.socialnetworkapi.security;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class TokenDetails {

  private Long userId;
  private String token;
  private LocalDateTime issuedAt;
  private LocalDateTime expiresAt;
}