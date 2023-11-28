package fs.socialnetworkapi.dto.message;

import fs.socialnetworkapi.dto.user.UserDtoOut;
import lombok.Getter;
import lombok.Setter;
import lombok.Data;



import java.time.LocalDateTime;

@Getter
@Setter
@Data
public class MessageDtoOut {

  private long id;
  private UserDtoOut user;
  private String text;
  private long chatId;
  private LocalDateTime createdDate;

}
