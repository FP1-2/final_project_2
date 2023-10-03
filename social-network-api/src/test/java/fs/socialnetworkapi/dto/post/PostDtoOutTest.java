package fs.socialnetworkapi.dto.post;

import fs.socialnetworkapi.dto.UserDtoOut;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class PostDtoOutTest {

  private UserDtoOut userDtoOut1;
  private UserDtoOut userDtoOut2;
  private PostDtoOut postDtoOut;

  @BeforeEach
  void setup() {
    userDtoOut1 = new UserDtoOut();
    userDtoOut1.setId(1L);

    userDtoOut2 = new UserDtoOut();
    userDtoOut2.setId(2L);

    postDtoOut = PostDtoOut.builder()
            .id(1L)
            .user(userDtoOut1)
            .description("Description")
            .photo("Photo")
            .createdDate(LocalDateTime.now())
            .timeWhenWasPost("")
            .usersReposts(List.of())
            .isRepost(false)
            .likes(List.of())
            .build();
  }

  @Test
  void getId() {
    assertEquals(1L, postDtoOut.getId());
  }

  @Test
  void getUser() {
    assertEquals(userDtoOut1, postDtoOut.getUser());
  }

  @Test
  void getDescription() {
    assertEquals("Description", postDtoOut.getDescription());
  }

  @Test
  void getPhoto() {
    assertEquals("Photo", postDtoOut.getPhoto());
  }

  @Test
  void setId() {
    postDtoOut.setId(2L);
    assertEquals(2L, postDtoOut.getId());
  }

  @Test
  void setUser() {
    postDtoOut.setUser(userDtoOut2);
    assertEquals(userDtoOut2, postDtoOut.getUser());
  }

  @Test
  void setDescription() {
    postDtoOut.setDescription("Description2");
    assertEquals("Description2", postDtoOut.getDescription());
  }

  @Test
  void setPhoto() {
    postDtoOut.setPhoto("Photo2");
    assertEquals("Photo2", postDtoOut.getPhoto());
  }

  @Test
  void testEquals(){
    PostDtoOut postDtoOut1 = PostDtoOut.builder()
            .id(1L)
            .user(userDtoOut1)
            .photo("photo")
            .description("desc").build();

    PostDtoOut postDtoOut2 = postDtoOut1;

    PostDtoOut postDtoOut3 = PostDtoOut.builder()
            .id(2L)
            .user(userDtoOut1)
            .photo("photo2")
            .description("desc2").build();

    PostDtoOut postDtoOut4 = PostDtoOut.builder()
            .id(3L)
            .user(userDtoOut1)
            .photo("photo")
            .description("desc").build();

    PostDtoOut postDtoOut5 = PostDtoOut.builder()
            .id(4L)
            .user(userDtoOut1)
            .photo("photo2")
            .description("desc").build();

    PostDtoOut postDtoOut6 = PostDtoOut.builder()
            .id(5L)
            .user(userDtoOut2)
            .photo("photo")
            .description("desc").build();

    PostDtoIn postDtoIn = PostDtoIn.builder().build();

    assertEquals(postDtoOut1,postDtoOut2);
    assertEquals(postDtoOut1,postDtoOut4);

    assertNotEquals(postDtoOut1,postDtoOut3);
    assertNotEquals(postDtoOut1,null);
    assertNotEquals(postDtoOut1,postDtoOut5);
    assertNotEquals(postDtoOut1,postDtoOut6);
    assertNotEquals(postDtoOut1, postDtoIn);
  }

  @Test
  void testHashCode(){
    PostDtoOut postDtoOut1 = PostDtoOut.builder()
            .id(1L)
            .user(userDtoOut1)
            .photo("photo")
            .description("desc").build();

    PostDtoOut postDtoOut2 = postDtoOut1;

    PostDtoOut postDtoOut3 = PostDtoOut.builder()
            .id(1L)
            .user(userDtoOut1)
            .photo("photo2")
            .description("desc").build();

    PostDtoOut postDtoOut4 = PostDtoOut.builder()
            .id(2L)
            .user(userDtoOut1)
            .photo("photo")
            .description("desc").build();

    assertEquals(postDtoOut1.hashCode(),postDtoOut2.hashCode());
    assertNotEquals(postDtoOut1.hashCode(),postDtoOut3.hashCode());
    assertEquals(postDtoOut1.hashCode(),postDtoOut4.hashCode());
  }
}