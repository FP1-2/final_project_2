package fs.socialnetworkapi.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "posts")
@Data
public class Post extends AbstractEntity {

  private String description;

  private String photo;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(
        name = "reposts",
        joinColumns = {@JoinColumn(name = "original_post_id")},
        inverseJoinColumns = {@JoinColumn(name = "user_id")})
  private Set<User> usersReposts = new HashSet<>();
}
