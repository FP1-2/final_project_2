package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.service.LikeService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;

class LikeControllerTest {

  private MockMvc mockMvc;
  private AutoCloseable closable;

  @Mock
  private LikeService likeService;

  @InjectMocks
  private LikeController likeController;

  @BeforeEach
  void setUp() {
    closable = MockitoAnnotations.openMocks(this);
    mockMvc = MockMvcBuilders.standaloneSetup(likeController).build();
  }

  @AfterEach
  void close() throws Exception {
    closable.close();
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
