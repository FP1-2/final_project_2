package fs.socialnetworkapi.repos;

import fs.socialnetworkapi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
  User findByEmail(String email);

  User findByActivationCode(String code);
}
