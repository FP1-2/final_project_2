package fs.socialnetworkapi.dto.message;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class CreateChatDtoIn {
  private List<Long> membersChat = new ArrayList<>();

}
