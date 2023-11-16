package fs.socialnetworkapi.dto.notification;

import fs.socialnetworkapi.dto.user.UserDtoOut;
import fs.socialnetworkapi.enums.NotificationType;
import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class NotificationDtoOut {

  @EqualsAndHashCode.Include
  private Long id;

  @EqualsAndHashCode.Include
  private UserDtoOut fromUser;

  @EqualsAndHashCode.Include
  private UserDtoOut notifyingUser;

  private String text;
  private NotificationType type;
  private String link;
  private boolean active;
  private LocalDateTime createdDate;

}
