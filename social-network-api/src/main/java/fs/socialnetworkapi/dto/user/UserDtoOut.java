package fs.socialnetworkapi.dto.user;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDtoOut {
  private Long id;
  private String firstName;
  private String lastName;
  private String email;
  private String birthday;

}
