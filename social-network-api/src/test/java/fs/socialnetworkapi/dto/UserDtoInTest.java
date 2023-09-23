package fs.socialnetworkapi.dto;

import fs.socialnetworkapi.dto.user.UserDtoIn;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class UserDtoInTest {
   UserDtoIn userTest = new UserDtoIn(1L, "Ivan", "Petrov", "test@org.ua", "05/08/82",
     "https://klike.net/uploads/posts/2019-03/1551511866_11.jpg",
     "https://www.liga.net/images/general/2019/02/14/20190214174619-9721.png");

  @Test
  void getId() {
    assertEquals(1L, userTest.getId());
  }

  @Test
  void getFirstName() {
    assertEquals("Ivan", userTest.getFirstName());
  }

  @Test
  void getLastName() {
    assertEquals("Petrov", userTest.getLastName());
  }

  @Test
  void getEmail() {
    assertEquals("test@org.ua", userTest.getEmail());
  }

  @Test
  void getBirthday() {
    assertEquals("05/08/82", userTest.getBirthday());
  }

  @Test
  void getAvatar() {
    assertEquals("https://klike.net/uploads/posts/2019-03/1551511866_11.jpg", userTest.getAvatar());
  }

  @Test
  void getMainPhoto() {
    assertEquals("https://www.liga.net/images/general/2019/02/14/20190214174619-9721.png", userTest.getMainPhoto());
  }
  UserDtoIn userTest1 = new UserDtoIn();
  @Test
  void setFirstName() {
    userTest1.setFirstName("Petro");
    assertEquals("Petro", userTest1.getFirstName());
  }

  @Test
  void setLastName() {
    userTest1.setLastName("Petrov");
    assertEquals("Petrov", userTest1.getLastName());
  }

  @Test
  void setEmail() {
    userTest1.setEmail("Petro@gmail.com");
    assertEquals("Petro@gmail.com", userTest1.getEmail());
  }

  @Test
  void setBirthday() {
    userTest1.setBirthday("23/02/92");
    assertEquals("23/02/92", userTest1.getBirthday());
  }

  @Test
  void setAvatar() {
    userTest1.setAvatar("Petro.img");
    assertEquals("Petro.img", userTest1.getAvatar());
  }

  @Test
  void setMainPhoto() {
    userTest1.setMainPhoto("Petro.png");
    assertEquals("Petro.png", userTest1.getMainPhoto());
  }

}