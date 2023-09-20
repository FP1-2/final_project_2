package fs.socialnetworkapi.dto.post;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Getter
@Setter
@Builder(toBuilder = true)
public class PostDtoOut {

  private Long id;
  private Long userId;
  private String description;
  private String photo;

  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null || getClass() != obj.getClass()) return false;
    PostDtoOut that = (PostDtoOut) obj;
    return Objects.equals(userId, that.userId) && Objects.equals(description, that.description) && Objects.equals(photo, that.photo);
  }

  @Override
  public int hashCode() {
    return Objects.hash(userId, description, photo);
  }
}
