package fs.socialnetworkapi.dto;

import fs.socialnetworkapi.dto.post.PostDtoIn;
import fs.socialnetworkapi.dto.post.PostDtoOut;
import fs.socialnetworkapi.entity.Like;
import fs.socialnetworkapi.entity.Post;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.service.LikeService;
import fs.socialnetworkapi.utils.Universal;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class MapperTest {

  @InjectMocks
  private Mapper mapper;
  @Mock
  private LikeService likeService;
  @Mock
  private ModelMapper modelMapper;

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

  @Test
  void testMapPostDtoOut() {
    User user1 = new User();
    user1.setId(1L);

    User user2 = new User();
    user2.setId(2L);

    UserDtoOut userDtoOut1 = new UserDtoOut();
    userDtoOut1.setId(1L);

    Post post = new Post();
    post.setDescription("Description");
    post.setPhoto("Photo");
    post.setUser(user1);

    Like like1 = new Like(user1, post);
    Like like2 = new Like(user2, post);
    List<Like> likes = List.of(like1, like2);

    PostDtoOut postDtoOut = PostDtoOut.builder()
            .id(1L)
            .user(userDtoOut1)
            .description("Description")
            .photo("Photo")
            .createdDate(LocalDateTime.now())
            .timeWhenWasPost("")
            .usersReposts(List.of())
            .isRepost(false)
            .likes(likes)
            .build();

    Mockito.when(likeService.getLikesForPost(post.getId())).thenReturn(likes);

    Mockito.when(this.modelMapper.map(post, PostDtoOut.class)).thenReturn(postDtoOut);

    PostDtoOut result = mapper.map(post);

    assertNotNull(result);

    assertEquals(likes, result.getLikes());
  }
}