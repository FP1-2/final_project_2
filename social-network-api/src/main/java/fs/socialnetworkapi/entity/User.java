package fs.socialnetworkapi.entity;



import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.OneToMany;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Setter
@Getter
public class User extends AbstractEntity implements UserDetails {

  private String username;
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
          name = "reposts",
          joinColumns = {@JoinColumn(name = "user_id")},
          inverseJoinColumns = {@JoinColumn(name = "original_post_id")})
  private Set<Post> reposts = new HashSet<>();

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(
          name = "subscriptions",
          joinColumns = {@JoinColumn(name = "follower_id")},
          inverseJoinColumns = {@JoinColumn(name = "following_id")})
  private Set<User> followers = new HashSet<>();

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(
          name = "subscriptions",
          joinColumns = {@JoinColumn(name = "following_id")},
          inverseJoinColumns = {@JoinColumn(name = "follower_id")})
  private Set<User> followings = new HashSet<>();

  @ManyToMany(fetch = FetchType.LAZY)
  private Set<RoleEntity> roles = new HashSet<>();

  public Set<RoleEntity> getRoles() {
    return roles;
  }


  public Collection<? extends GrantedAuthority> getAuthorities() {
    return this.roles;
  }

  @Override
  public boolean isAccountNonExpired() {
    return false;
  }

  @Override
  public boolean isAccountNonLocked() {
    return false;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return false;
  }

  @Override
  public boolean isEnabled() {
    return false;
  }
}


