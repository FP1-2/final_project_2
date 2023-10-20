package fs.socialnetworkapi.entity;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class UserTest {

  @Test
  void testGettersAndSetters() {
    User user = new User();
    user.setId(1L);
    user.setFirstName("John");
    user.setLastName("Doe");
    user.setEmail("john@example.com");
    user.setBirthday("1990-01-01");
    user.setAvatar("avatar.jpg");
    user.setMainPhoto("main.jpg");
    user.setPassword("password");
    user.setActive(true);
    user.setActivationCode("123456");

    assertEquals(1L, user.getId());
    assertEquals("John", user.getFirstName());
    assertEquals("Doe", user.getLastName());
    assertEquals("john@example.com", user.getEmail());
    assertEquals("1990-01-01", user.getBirthday());
    assertEquals("avatar.jpg", user.getAvatar());
    assertEquals("main.jpg", user.getMainPhoto());
    assertEquals("password", user.getPassword());
    assertEquals(true, user.isActive());
    assertEquals("123456", user.getActivationCode());
  }
}