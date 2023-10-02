package fs.socialnetworkapi.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.security.core.GrantedAuthority;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "roles")
@Data
@Setter
@Getter
public class RoleEntity extends AbstractEntity implements GrantedAuthority {

  private String name;

//  @Transient
  @LazyCollection(LazyCollectionOption.FALSE)
  @ManyToMany(cascade = { CascadeType.MERGE })
  @JoinTable(
      name = "users_roles",
      joinColumns = { @JoinColumn(name = "role_id") },
      inverseJoinColumns = { @JoinColumn(name = "user_id") })
  private Set<User> users = new HashSet<>();

  public RoleEntity(Long id, String name) {
    setId(id);
    this.name = name;
  }

  public RoleEntity(String name) {
    this.name = name;
  }

  public RoleEntity() {

  }

  public static RoleEntity getUserRole() {
    RoleEntity roleEntity = new RoleEntity();
    roleEntity.setName("USER");
    return roleEntity;
  }

  @Override
  public String getAuthority() {
    return null;
  }
}
