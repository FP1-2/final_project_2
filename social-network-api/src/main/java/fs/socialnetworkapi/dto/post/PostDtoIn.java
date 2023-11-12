package fs.socialnetworkapi.dto.post;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder(toBuilder = true)
public class PostDtoIn {

  private Long id;
  private Long userId;
  @NotNull
  private String photo;
  @NotNull
  private String description;

}
