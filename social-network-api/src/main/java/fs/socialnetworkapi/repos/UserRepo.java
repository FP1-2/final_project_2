package fs.socialnetworkapi.repos;

import fs.socialnetworkapi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
  User findByEmail(String email);

  User findByActivationCode(String code);

  User findByUsername(String username);

  @Query("SELECT u FROM User u WHERE u.username LIKE :username%")
  List<User> searchByUsernameLike(@Param("username") String username);

}
