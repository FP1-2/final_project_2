package fs.socialnetworkapi.entity;



import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Setter
@Getter
public class User extends AbstractEntity {

  private String firstName;
  private String lastName;
  private String email;
  private String birthday;
  private String avatar;
  private String mainPhoto;
  private String password;
  private boolean active;
  private String activationCode;

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
  private List<Post> posts;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(
          name = "subscriptions",
          joinColumns = {@JoinColumn(name = "follower_is")},
          inverseJoinColumns = {@JoinColumn(name = "following_id")})
  private Set<User> followers = new HashSet<>();

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(
          name = "subscriptions",
          joinColumns = {@JoinColumn(name = "following_id")},
          inverseJoinColumns = {@JoinColumn(name = "follower_is")})
  private Set<User> followings = new HashSet<>();

}


