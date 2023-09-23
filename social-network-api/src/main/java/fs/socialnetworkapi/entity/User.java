package fs.socialnetworkapi.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

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
}


