package fs.socialnetworkapi.dto;

import fs.socialnetworkapi.dto.post.PostDtoIn;
import fs.socialnetworkapi.dto.post.PostDtoOut;
import fs.socialnetworkapi.entity.Post;
import fs.socialnetworkapi.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertTrue;
class MapperTest {

  @InjectMocks
  private Mapper mapper;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void testMapPostToPostDtoOut() {

    User user = new User();
    user.setId(2L);

    Post post = new Post();
    post.setId(1L);
    post.setUser(user);
    post.setPhoto("Photo");
    post.setDescription("Description");

    PostDtoOut postDtoOut = PostDtoOut.builder()
            .id(1L)
            .userId(2L)
            .photo("Photo")
            .description("Description")
            .build();

    PostDtoOut dtoOut = mapper.map(post);

    assertTrue(postDtoOut.equals(dtoOut));

  }

  @Test
  void testMapPostDtoInToPost() {

    Post post1 = new Post();
    post1.setPhoto("Photo");
    post1.setDescription("Description");

    PostDtoIn postDtoIn = PostDtoIn.builder()
            .photo("Photo")
            .description("Description")
            .build();

    Post post2 = mapper.map(postDtoIn);

    assertTrue(post1.equals(post2));

  }
}