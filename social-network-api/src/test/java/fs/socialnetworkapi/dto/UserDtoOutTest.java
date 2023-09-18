package fs.socialnetworkapi.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserDtoOutTest {

  @Test
  void testUserDtoOutGetterAndSetter() {
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
//
//UserDtoIn userTest = new UserDtoIn(1L, "Ivan", "Petrov", "test@org.ua", "05/08/82",
//    "https://klike.net/uploads/posts/2019-03/1551511866_11.jpg",
//    "https://www.liga.net/images/general/2019/02/14/20190214174619-9721.png");
//
//  @Test
//  void getId() {
//    assertEquals(1L, userTest.getId());
//  }
//
//  @Test
//  void getFirstName() {
//    assertEquals("Ivan", userTest.getFirstName());
//  }
//
//  @Test
//  void getLastName() {
//    assertEquals("Petrov", userTest.getLastName());
//  }
//
//  @Test
//  void getEmail() {
//    assertEquals("test@org.ua", userTest.getEmail());
//  }
//
//  @Test
//  void getBirthday() {
//    assertEquals("05/08/82", userTest.getBirthday());
//  }
//
//  @Test
//  void getAvatar() {
//    assertEquals("https://klike.net/uploads/posts/2019-03/1551511866_11.jpg", userTest.getAvatar());
//  }
//
//  @Test
//  void getMainPhoto() {
//    assertEquals("https://www.liga.net/images/general/2019/02/14/20190214174619-9721.png", userTest.getMainPhoto());
//  }
//  UserDtoIn userTest1 = new UserDtoIn();
//  @Test
//  void setFirstName() {
//    userTest1.setFirstName("Petro");
//    assertEquals(userTest1.getFirstName(), "Petro");
//  }
//
//  @Test
//  void setLastName() {
//    userTest1.setLastName("Petrov");
//    assertEquals(userTest1.getLastName(), "Petrov");
//  }
//
//  @Test
//  void setEmail() {
//    userTest1.setEmail("Petro@gmail.com");
//    assertEquals(userTest1.getEmail(), "Petro@gmail.com");
//  }
//
//  @Test
//  void setBirthday() {
//    userTest1.setBirthday("23/02/92");
//    assertEquals(userTest1.getBirthday(), "23/02/92");
//  }
//
//  @Test
//  void setAvatar() {
//    userTest1.setAvatar("Petro.img");
//    assertEquals(userTest1.getAvatar(), "Petro.img");
//  }
//
//  @Test
//  void setMainPhoto() {
//    userTest1.setMainPhoto("Petro.png");
//    assertEquals(userTest1.getMainPhoto(), "Petro.png");
//  }
}