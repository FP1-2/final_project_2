package fs.socialnetworkapi.dto.post;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder(toBuilder = true)
public class PostDtoOut {

  private Long id;
  private Long userId;
  private String description;
  private String photo;

}
