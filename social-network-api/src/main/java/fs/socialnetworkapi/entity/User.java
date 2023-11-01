package fs.socialnetworkapi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.checkerframework.common.aliasing.qual.Unique;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Objects;

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
  private String address;
  private boolean active;
  private String activationCode;
  private String roles;
  private String userDescribe;
  private String bgProfileImage;
  private String userLink;

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

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority("ROLE_USER"));
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

  @Override
  public boolean equals(Object obj) {
    if (this == obj) {
      return true;
    }
    if (obj == null || getClass() != obj.getClass()) {
      return false;
    }
    User user = (User) obj;
    return Objects.equals(this.getId(), user.getId());
  }

  @Override
  public int hashCode() {
    return Objects.hash(this.getId());
  }


 }