package fs.socialnetworkapi.dto.post;

import lombok.Builder;
import lombok.Data;

@Data
@Builder(toBuilder = true)
public class PostDtoOut {

  private Long id;
  private Long userId;
  private String description;
  private String photo;

}
