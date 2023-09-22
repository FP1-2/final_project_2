package fs.socialnetworkapi.dto.post;

import fs.socialnetworkapi.dto.UserDtoOut;
import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class PostDtoOut {

  private Long id;
  private Long userId;
  private String description;
  private String photo;
  private LocalDateTime createdDate;
  private List<UserDtoOut> usersReposts;
  private Boolean isRepost = false;

  @Override
  public boolean equals(Object obj) {
    if (this == obj) {
      return true;
    }
    if (obj == null || getClass() != obj.getClass()) {
      return false;
    }
    PostDtoOut that = (PostDtoOut) obj;
    return Objects.equals(userId, that.userId)
            && Objects.equals(description, that.description)
            && Objects.equals(photo, that.photo);
  }

  @Override
  public int hashCode() {
    return Objects.hash(userId, description, photo);
  }
}
