package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.dto.post.PostDtoOut;
import fs.socialnetworkapi.service.LikeService;
import fs.socialnetworkapi.service.PostService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;

class LikeControllerTest {

  private MockMvc mockMvc;

  @Mock
  private LikeService likeService;

  @Mock
  private PostService postService;

  @InjectMocks
  private LikeController likeController;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.initMocks(this);
    mockMvc = MockMvcBuilders.standaloneSetup(likeController).build();
  }

  @Test
  public void testGetLikesForPost() throws Exception {
    Long postId = 1L;
    PostDtoOut postDtoOut = new PostDtoOut();

    when(postService.findById(postId)).thenReturn(postDtoOut);

    mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/likes/post/{postId}", postId))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(postDtoOut.getId()));
  }

  @Test
  public void testGetLikesForPosts() throws Exception {
    List<Long> postIds = Arrays.asList(1L, 2L);
    List<PostDtoOut> postDtoOutList = Arrays.asList(
            new PostDtoOut(),
            new PostDtoOut()
    );

    when(postService.findByIds(postIds)).thenReturn(postDtoOutList);

    mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/likes/posts")
                    .param("postIds", "1", "2"))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value(postDtoOutList.get(0).getId()))
            .andExpect(MockMvcResultMatchers.jsonPath("$[1].id").value(postDtoOutList.get(1).getId()));
  }

  @Test
  public void testGetLikedPostsForUser() throws Exception {
    Long userId = 1L;
    List<PostDtoOut> postDtoOutList = Arrays.asList(
            new PostDtoOut(),
            new PostDtoOut()
    );

    when(postService.findLikedPostsByUserId(userId)).thenReturn(postDtoOutList);

    mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/likes/user/{userId}", userId))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value(postDtoOutList.get(0).getId()))
            .andExpect(MockMvcResultMatchers.jsonPath("$[1].id").value(postDtoOutList.get(1).getId()));
  }


  @Test
  void testLikePost() throws Exception {
    Long postId = 1L;
    Long userId = 2L;

    mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/likes/like/{postId}/{userId}", postId, userId))
            .andExpect(MockMvcResultMatchers.status().isOk());

    verify(likeService, times(1)).likePost(postId, userId);
  }
}
