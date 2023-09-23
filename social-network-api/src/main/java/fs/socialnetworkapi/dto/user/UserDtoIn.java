package fs.socialnetworkapi.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
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
  private String mainPhoto;
  private String password;
  private boolean active;
  private String activationCode;

  public UserDtoIn() {
  }

  public UserDtoIn(Long id, String firstName, String lastName, String email, String birthday, String avatar,
                   String mainPhoto) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.birthday = birthday;
    this.avatar = avatar;
    this.mainPhoto = mainPhoto;
  }
}

