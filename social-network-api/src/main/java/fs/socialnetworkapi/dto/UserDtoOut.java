package fs.socialnetworkapi.dto;

import lombok.Data;

@Data
public class UserDtoOut {
  private Long id;
  private String firstName;
  private String lastName;
  private String email;
  private String birthday;

}
