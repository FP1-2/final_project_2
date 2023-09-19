package fs.socialnetworkapi.dto.post;

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
  private String photo;
  @Size(min = 1, max = 280, message = "Description should be between 1 and 280 characters")
  private String description;

}
