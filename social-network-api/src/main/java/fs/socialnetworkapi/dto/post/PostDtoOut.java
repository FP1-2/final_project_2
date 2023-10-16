package fs.socialnetworkapi.dto.post;

import fs.socialnetworkapi.dto.user.UserDtoOut;
import fs.socialnetworkapi.entity.Like;
import fs.socialnetworkapi.enums.TypePost;
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
  private long id;
  private UserDtoOut user;
  private String description;
  private String photo;
  private LocalDateTime createdDate;
  private List<Like> likes;
  private TypePost typePost;
  private int countRepost;
  private int countComments;
  private int countLikes;
  private OriginalPostDto originalPost;
  private List<PostDtoOut> comments;
  //private boolean yourRepost;
  //private boolean thisUserHasRepost;

  @Override
  public boolean equals(Object obj) {
    if (this == obj) {
      return true;
    }
    if (obj == null || getClass() != obj.getClass()) {
      return false;
    }
    PostDtoOut that = (PostDtoOut) obj;
    return Objects.equals(id, that.id)
            && Objects.equals(user, that.user)
            && Objects.equals(description, that.description)
            && Objects.equals(photo, that.photo);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, user, description, photo);
  }
}
