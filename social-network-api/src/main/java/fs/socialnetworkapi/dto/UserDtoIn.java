package fs.socialnetworkapi.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.validator.constraints.Range;

@Data
public class UserDtoIn {

  private Long id;
  @NotNull
  @Size(min = 2, message = "User firstname should have at least 2 characters")
  private String firstName;
  @NotNull
  @Size(min = 2, message = "User lastname should have at least 2 characters")
  private String lastName;
  @Email
  private String email;
  @NotNull
  private String birthday;
  private String avatar;
  private String mainFoto;
  private String password;
  private boolean active;
  private String activationCode;

  public UserDtoIn() {
  }

}

