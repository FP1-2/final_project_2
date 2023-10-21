package fs.socialnetworkapi.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDtoIn {

  private Long id;
  private String username;
  @NotNull
  @Size(min = 2, message = "User firstname should have at least 2 characters")
  private String firstName;
  @NotNull
  @Size(min = 2, message = "User lastname should have at least 2 characters")
  private String lastName;
  @Email
  //  @NotNull
  private String email;
  @NotNull
  @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "birthday should be in format '1990-01-01'")
  private String birthday;
  private String avatar;
  private String mainPhoto;
  private String password;
  private String address;
  private boolean active;
  private String activationCode;
  private String roles;
  private String userDescribe;
  private String bgProfileImage;
  private String userLink;

  public UserDtoIn() {
  }

  public UserDtoIn(Long id, String firstName, String lastName, String email, String birthday, String avatar,
                   String mainPhoto, String address) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.birthday = birthday;
    this.avatar = avatar;
    this.mainPhoto = mainPhoto;
    this.address = address;
  }

  public String getUsername() {
    return (this.username == null) ? (String.format("%s_%s",this.firstName,this.lastName)) : (this.username);
  }

}