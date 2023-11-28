package fs.socialnetworkapi.dto.message;

import lombok.Getter;
import lombok.Setter;
import lombok.Data;


@Getter
@Setter
@Data
public class MessageDtoIn {

  private long chatId;
  private String text;

}
