package fs.socialnetworkapi.dto.message;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageDtoIn {

  private long chatId;
  private String text;

}
