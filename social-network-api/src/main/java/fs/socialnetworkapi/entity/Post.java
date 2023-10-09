package fs.socialnetworkapi.entity;


import fs.socialnetworkapi.enums.TypePost;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.EnumType;
import jakarta.persistence.FetchType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "posts")
@Data
public class Post extends AbstractEntity {

  private String description;

  private String photo;

  @Enumerated(EnumType.STRING)
  private TypePost typePost;
  @Transient
  private int countReposts;

  @ManyToOne(fetch=FetchType.EAGER)
  @JoinColumn(name = "user_id")
  private User user;

  @OneToMany(mappedBy = "originalPost", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<Post> reposts = new HashSet<>();

  @ManyToOne
  @JoinColumn(name = "original_post_id", referencedColumnName = "id")
  private Post originalPost;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Post post = (Post) o;
    return Objects.equals(this.getId(), post.getId())
            && Objects.equals(description, post.description)
            && Objects.equals(photo, post.photo)
            && Objects.equals(user, post.user);
  }

  @Override
  public int hashCode() {
    return Objects.hash(this.getId(),description, photo, user);
  }

  @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Like> likes = new ArrayList<>();

}
