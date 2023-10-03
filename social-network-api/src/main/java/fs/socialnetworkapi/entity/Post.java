package fs.socialnetworkapi.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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

  @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Like> likes = new ArrayList<>();

}
