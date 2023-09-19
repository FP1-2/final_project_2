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

}