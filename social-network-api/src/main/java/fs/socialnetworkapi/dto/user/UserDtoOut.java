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
  private Integer userTweetCount;
  private Integer userFollowersCount;
  private Integer userFollowingCount;

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
            && Objects.equals(username, that.username)
            && Objects.equals(firstName, that.firstName)
            && Objects.equals(lastName, that.lastName)
            && Objects.equals(email, that.email)
            && Objects.equals(birthday, that.birthday)
            && Objects.equals(address, that.address)
            && Objects.equals(avatar, that.avatar)
            && Objects.equals(createdDate, that.createdDate)
            && Objects.equals(userDescribe, that.userDescribe)
            && Objects.equals(bgProfileImage, that.bgProfileImage)
            && Objects.equals(userLink, that.userLink)
            && Objects.equals(userTweetCount, that.userTweetCount)
            && Objects.equals(userFollowersCount, that.userFollowersCount)
            && Objects.equals(userFollowingCount, that.userFollowingCount);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, username, firstName, lastName, email, birthday, avatar, address);
  }
}
