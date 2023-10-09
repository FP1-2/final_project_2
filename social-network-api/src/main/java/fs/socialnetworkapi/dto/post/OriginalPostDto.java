package fs.socialnetworkapi.dto.post;

import fs.socialnetworkapi.dto.user.UserDtoOut;
import fs.socialnetworkapi.enums.TypePost;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class OriginalPostDto {

  private long id;
  private UserDtoOut user;
  private String description;
  private String photo;
  private TypePost typePost;

}
