package fs.socialnetworkapi.dto.user;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Objects;

@Setter
@Getter
public class UserDtoOut {
  private Long id;
  private String username;
  private String firstName;
  private String lastName;
  private String email;
  private String birthday;
  private String avatar;
  private String address;
  private LocalDateTime createdDate;
  private String userDescribe;
  private String bgProfileImage;
  private String userLink;
  private int userTweetCount;
  private int userFollowersCount;
  private int userFollowingCount;
  private boolean userFollowers;

  @Override
  public boolean equals(Object obj) {
    if (this == obj) {
      return true;
    }
    if (obj == null || getClass() != obj.getClass()) {
      return false;
    }
    UserDtoOut that = (UserDtoOut) obj;
    return Objects.equals(id, that.id)
            && Objects.equals(email, that.email)
            && Objects.equals(createdDate, that.createdDate);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, email, createdDate);
  }
}