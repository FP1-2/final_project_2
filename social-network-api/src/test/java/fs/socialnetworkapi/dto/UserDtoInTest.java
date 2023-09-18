package fs.socialnetworkapi.dto;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class UserDtoInTest {
   UserDtoIn userTest = new UserDtoIn(1L, "Ivan", "Petrov", "test@org.ua", "05/08/82",
     "https://klike.net/uploads/posts/2019-03/1551511866_11.jpg",
     "https://www.liga.net/images/general/2019/02/14/20190214174619-9721.png");

  @Test
  void getId() {
    assertEquals(userTest.getId(), 1L);
  }

  @Test
  void getFirstName() {
    assertEquals(userTest.getFirstName(), "Ivan");
  }

  @Test
  void getLastName() {
    assertEquals(userTest.getLastName(), "Petrov");
  }

  @Test
  void getEmail() {
    assertEquals(userTest.getEmail(), "test@org.ua");
  }

  @Test
  void getBirthday() {
    assertEquals(userTest.getBirthday(), "05/08/82");
  }

  @Test
  void getAvatar() {
    assertEquals(userTest.getAvatar(), "https://klike.net/uploads/posts/2019-03/1551511866_11.jpg");
  }

  @Test
  void getMainPhoto() {
    assertEquals(userTest.getMainPhoto(), "https://www.liga.net/images/general/2019/02/14/20190214174619-9721.png");
  }
  UserDtoIn userTest1 = new UserDtoIn();
  @Test
  void setFirstName() {
    userTest1.setFirstName("Petro");
    assertEquals(userTest1.getFirstName(), "Petro");
  }

  @Test
  void setLastName() {
    userTest1.setLastName("Petrov");
    assertEquals(userTest1.getLastName(), "Petrov");
  }

  @Test
  void setEmail() {
    userTest1.setEmail("Petro@gmail.com");
    assertEquals(userTest1.getEmail(), "Petro@gmail.com");
  }

  @Test
  void setBirthday() {
    userTest1.setBirthday("23/02/92");
    assertEquals(userTest1.getBirthday(), "23/02/92");
  }

  @Test
  void setAvatar() {
    userTest1.setAvatar("Petro.img");
    assertEquals(userTest1.getAvatar(), "Petro.img");
  }

  @Test
  void setMainPhoto() {
    userTest1.setMainPhoto("Petro.png");
    assertEquals(userTest1.getMainPhoto(), "Petro.png");
  }

}