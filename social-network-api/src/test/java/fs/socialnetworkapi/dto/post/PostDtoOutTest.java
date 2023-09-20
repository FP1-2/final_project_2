package fs.socialnetworkapi.dto.post;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PostDtoOutTest {


  PostDtoOut postDtoOut = new PostDtoOut(1L,1L,"Description", "Photo");

  @Test
  void getId() {
    assertEquals(1L, postDtoOut.getId());
  }

  @Test
  void getUserId() {
    assertEquals(1L, postDtoOut.getUserId());
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
  void setUserId() {
    postDtoOut.setUserId(2L);
    assertEquals(2L, postDtoOut.getUserId());
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
            .userId(1L)
            .photo("photo")
            .description("desc").build();

    PostDtoOut postDtoOut2 = postDtoOut1;

    PostDtoOut postDtoOut3 = PostDtoOut.builder()
            .id(1L)
            .userId(1L)
            .photo("photo2")
            .description("desc").build();

    PostDtoOut postDtoOut4 = PostDtoOut.builder()
            .id(2L)
            .userId(1L)
            .photo("photo")
            .description("desc").build();

    assertEquals(postDtoOut1,postDtoOut2);
    assertNotEquals(postDtoOut1,postDtoOut3);
    assertNotEquals(postDtoOut1,null);
    assertEquals(postDtoOut1,postDtoOut4);
  }

  @Test
  void testHashCode(){
    PostDtoOut postDtoOut1 = PostDtoOut.builder()
            .id(1L)
            .userId(1L)
            .photo("photo")
            .description("desc").build();

    PostDtoOut postDtoOut2 = postDtoOut1;

    PostDtoOut postDtoOut3 = PostDtoOut.builder()
            .id(1L)
            .userId(1L)
            .photo("photo2")
            .description("desc").build();

    PostDtoOut postDtoOut4 = PostDtoOut.builder()
            .id(2L)
            .userId(1L)
            .photo("photo")
            .description("desc").build();

    assertEquals(postDtoOut1.hashCode(),postDtoOut2.hashCode());
    assertNotEquals(postDtoOut1.hashCode(),postDtoOut3.hashCode());
    assertEquals(postDtoOut1.hashCode(),postDtoOut4.hashCode());
  }
}