package fs.socialnetworkapi.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class UserDtoOutTest {

  @Test
  public void testUserDtoOutGetterAndSetter() {
    UserDtoOut userDtoOut = new UserDtoOut();
    userDtoOut.setId(1L);
    userDtoOut.setFirstName("John");
    userDtoOut.setLastName("Doe");
    userDtoOut.setEmail("john@example.com");
    userDtoOut.setBirthday("1990-01-01");

    assertEquals(1L, userDtoOut.getId());
    assertEquals("John", userDtoOut.getFirstName());
    assertEquals("Doe", userDtoOut.getLastName());
    assertEquals("john@example.com", userDtoOut.getEmail());
    assertEquals("1990-01-01", userDtoOut.getBirthday());
  }

  @Test
  public void testUserDtoOutToString() {
    UserDtoOut userDtoOut = new UserDtoOut();
    userDtoOut.setId(1L);
    userDtoOut.setFirstName("John");
    userDtoOut.setLastName("Doe");
    userDtoOut.setEmail("john@example.com");
    userDtoOut.setBirthday("1990-01-01");

    String expectedToString = "UserDtoOut(id=1, firstName=John, lastName=Doe, email=john@example.com, birthday=1990-01-01)";
    assertEquals(expectedToString, userDtoOut.toString());
  }
}