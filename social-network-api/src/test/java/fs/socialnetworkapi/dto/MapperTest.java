package fs.socialnetworkapi.dto;

import fs.socialnetworkapi.dto.post.PostDtoIn;
import fs.socialnetworkapi.dto.post.PostDtoOut;
import fs.socialnetworkapi.entity.Post;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.utils.Universal;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.List;

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
    LocalDateTime createDate = LocalDateTime.now().minusMinutes(30);
    User user = new User();
    user.setId(2L);
    user.setUsername("Jim");

    Post post = new Post();
    post.setId(1L);
    post.setUser(user);
    post.setPhoto("Photo");
    post.setDescription("Description");
    post.setCreatedDate(createDate);

    UserDtoOut userDtoOut = new UserDtoOut();
    userDtoOut.setId(2L);
    userDtoOut.setUsername("Jim");

    PostDtoOut postDtoOut = PostDtoOut.builder()
            .id(1L)
            .user(userDtoOut)
            .photo("Photo")
            .description("Description")
            .createdDate(createDate)
            .timeWhenWasPost(Universal.convert(createDate))
            .usersReposts(List.of())
            .isRepost(false)
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