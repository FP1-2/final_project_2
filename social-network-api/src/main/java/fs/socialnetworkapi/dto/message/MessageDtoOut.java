package fs.socialnetworkapi.dto.message;

import fs.socialnetworkapi.dto.user.UserDtoOut;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MessageDtoOut {

  private long id;
  private UserDtoOut user;
  private String text;
  private long chatId;
  private LocalDateTime createdDate;

}
