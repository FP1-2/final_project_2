package fs.socialnetworkapi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
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

  @OneToMany(mappedBy = "user")
  private List<Post> posts;

  @ManyToMany(fetch = FetchType.EAGER)
  private Set<RoleEntity> roles;

  public Set<RoleEntity> getRoles() {
    return roles;
  }

  public Collection<? extends GrantedAuthority> getAuthorities() {
    return this.roles;
  }
}


