package fs.socialnetworkapi.repos;

import fs.socialnetworkapi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long> {
  User findByEmail(String username);

  User findByActivationCode(String code);
}
