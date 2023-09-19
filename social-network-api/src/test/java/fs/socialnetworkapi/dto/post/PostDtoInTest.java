package fs.socialnetworkapi.dto.post;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PostDtoInTest {

  PostDtoIn postDtoIn = new PostDtoIn(1L,1L,"photo","description");
  @Test
  void getId() {
    assertEquals(1L, postDtoIn.getId());
  }

  @Test
  void getUserId() {
    assertEquals(1L, postDtoIn.getUserId());
  }

  @Test
  void getPhoto() {
    assertEquals("photo", postDtoIn.getPhoto());
  }

  @Test
  void getDescription() {
    assertEquals("description", postDtoIn.getDescription());
  }

  @Test
  void setId() {
    postDtoIn.setId(2L);
    assertEquals(2L, postDtoIn.getId());
  }

  @Test
  void setUserId() {
    postDtoIn.setUserId(2L);
    assertEquals(2L, postDtoIn.getUserId());
  }

  @Test
  void setPhoto() {
    postDtoIn.setPhoto("photo2");
    assertEquals("photo2", postDtoIn.getPhoto());
  }

  @Test
  void setDescription() {
    postDtoIn.setDescription("description2");
    assertEquals("description2", postDtoIn.getDescription());
  }

  @Test
  void testEquals() {
  }

  @Test
  void canEqual() {

  }

  @Test
  void testHashCode() {
  }

  @Test
  void testToString() {
  }

  @Test
  void builder() {
  }

  @Test
  void toBuilder() {
  }
}