package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.entity.Like;
import fs.socialnetworkapi.service.LikeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import java.util.ArrayList;
import java.util.List;

class LikeControllerTest {

  private MockMvc mockMvc;

  @Mock
  private LikeService likeService;

  @BeforeEach
  public void setup() {
    MockitoAnnotations.initMocks(this);
    LikeController likeController = new LikeController(likeService);
    mockMvc = MockMvcBuilders.standaloneSetup(likeController).build();
  }

  @Test
  void testGetLikesForPost() throws Exception {
    Long postId = 1L;
    List<Like> likes = new ArrayList<>();
    likes.add(new Like());
    likes.add(new Like());

    when(likeService.getLikesForPost(postId)).thenReturn(likes);

    mockMvc.perform(get("/api/v1/likes/post/" + postId)
                    .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.length()").value(2));
  }

  @Test
  void testGetLikesForUser() throws Exception {
    Long userId = 1L;
    List<Like> likes = new ArrayList<>();
    likes.add(new Like());
    likes.add(new Like());

    when(likeService.getLikesForUser(userId)).thenReturn(likes);

    mockMvc.perform(get("/api/v1/likes/user/" + userId)
                    .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.length()").value(2));
  }

  @Test
  void testLikePost() throws Exception {
    Long postId = 1L;
    Long userId = 2L;

    mockMvc.perform(post("/api/v1/likes/like/" + postId + "/" + userId)
                    .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk());

    verify(likeService, times(1)).likePost(postId, userId);
  }
}
