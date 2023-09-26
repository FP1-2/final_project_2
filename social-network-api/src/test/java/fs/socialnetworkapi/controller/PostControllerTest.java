package fs.socialnetworkapi.controller;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import fs.socialnetworkapi.dto.UserDtoOut;
import fs.socialnetworkapi.dto.post.PostDtoIn;
import fs.socialnetworkapi.dto.post.PostDtoOut;
import fs.socialnetworkapi.service.PostService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(PostController.class)
public class PostControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private PostService postService;

    private UserDtoOut userDtoOut1;
    private UserDtoOut userDtoOut2;
    private PostDtoOut postDtoOut1;
    private PostDtoOut postDtoOut2;
    private PostDtoOut postDtoOut3;
    private PostDtoOut repostDtoOut4;
    private PostDtoIn postDtoIn;

    @BeforeEach
    public void setUp() {
        userDtoOut1 = new UserDtoOut();
        userDtoOut1.setId(1L);
        userDtoOut1.setUsername("Jim");

        userDtoOut2 = new UserDtoOut();
        userDtoOut2.setId(2L);
        userDtoOut2.setUsername("Bil");

        postDtoOut1 = PostDtoOut
                .builder()
                .id(1L)
                .user(userDtoOut1)
                .description("New Description1")
                .photo("URL photo1").build();

        postDtoOut2 = PostDtoOut.
                builder()
                .id(2L)
                .user(userDtoOut1)
                .description("New Description2")
                .photo("URL photo2").build();

        postDtoOut3 = PostDtoOut
                .builder()
                .id(3L)
                .user(userDtoOut1)
                .description("New Description3")
                .photo("URL photo3")
                .build();

        repostDtoOut4 = PostDtoOut
                .builder()
                .id(4L)
                .user(userDtoOut2)
                .description("New Description4")
                .photo("URL photo4")
                .isRepost(true)
                .usersReposts(List.of(userDtoOut1))
                .build();

        postDtoIn = PostDtoIn.builder()
                .description("New Description1")
                .photo("URL photo1")
                .build();
    }

    @Test
    public void testAddPost() throws Exception {

        Mockito.when(postService.save(eq(1L), any(PostDtoIn.class))).thenReturn(postDtoOut1);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/v1/user/{user_id}/post", 1)
                        .content(objectMapper.writeValueAsString(postDtoIn))
                        .contentType(MediaType.APPLICATION_JSON))

                .andExpect(status().isOk())
                .andReturn();

        String responseJson = mvcResult.getResponse().getContentAsString();
        PostDtoOut postDtoOut = objectMapper.readValue(responseJson, PostDtoOut.class);

        assertEquals(1L, postDtoOut.getId());
        assertEquals(userDtoOut1, postDtoOut.getUser());
        assertEquals("New Description1", postDtoOut.getDescription());
        assertEquals("URL photo1", postDtoOut.getPhoto());
    }

    @Test
    public void testEditePost() throws Exception {

        Mockito.when(postService.editePost(any(PostDtoIn.class))).thenReturn(postDtoOut1);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
                        .put("/api/v1/user/{user_id}/post", 1)
                        .content(objectMapper.writeValueAsString(postDtoIn))
                        .contentType(MediaType.APPLICATION_JSON))

                .andExpect(status().isOk())
                .andReturn();

        String responseJson = mvcResult.getResponse().getContentAsString();
        PostDtoOut postDtoOut = objectMapper.readValue(responseJson, PostDtoOut.class);

        assertEquals(1L, postDtoOut.getId());
        assertEquals(userDtoOut1, postDtoOut.getUser());
        assertEquals("New Description1", postDtoOut.getDescription());
        assertEquals("URL photo1", postDtoOut.getPhoto());
    }

    @Test
    public void testRemotePost() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/api/v1/user/{user_id}/post/{post_id}", 1, 1)
                        .contentType(MediaType.APPLICATION_JSON))

                .andExpect(status().isOk());
    }

    @Test
    public void testGetAllUserPosts() throws Exception {

        List<PostDtoOut> postDtoOuts = List.of(postDtoOut1, postDtoOut2, postDtoOut3);

        Mockito.when(postService.getAllUserPosts(1L, 0, 10)).thenReturn(postDtoOuts);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v1/user/{user_id}/posts?page=0&size=10", 1)
                        .contentType(MediaType.APPLICATION_JSON))

                .andExpect(status().isOk())
                .andReturn();

        String responseJson = mvcResult.getResponse().getContentAsString();
        postDtoOuts = objectMapper.readValue(responseJson, new TypeReference<List<PostDtoOut>>(){});

        assertEquals(3, postDtoOuts.size());

        assertEquals(1L, postDtoOuts.get(0).getId());
        assertEquals(userDtoOut1, postDtoOuts.get(0).getUser());
        assertEquals("URL photo1", postDtoOuts.get(0).getPhoto());
        assertEquals("New Description1", postDtoOuts.get(0).getDescription());
    }

    @Test
    public void testGetAllPosts() throws Exception {

        List<PostDtoOut> postDtoOuts = List.of(postDtoOut1, postDtoOut2, postDtoOut3);

        Mockito.when(postService.getAllPost(0, 10)).thenReturn(postDtoOuts);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v1/all-posts?page=0&size=10")
                        .contentType(MediaType.APPLICATION_JSON))

                .andExpect(status().isOk())
                .andReturn();

        String responseJson = mvcResult.getResponse().getContentAsString();
        postDtoOuts = objectMapper.readValue(responseJson, new TypeReference<List<PostDtoOut>>(){});

        assertEquals(3, postDtoOuts.size());

        assertEquals(1L, postDtoOuts.get(0).getId());
        assertEquals(userDtoOut1, postDtoOuts.get(0).getUser());
        assertEquals("URL photo1", postDtoOuts.get(0).getPhoto());
        assertEquals("New Description1", postDtoOuts.get(0).getDescription());
    }

    @Test
    public void testGetFollowingsPosts() throws Exception {

        List<PostDtoOut> postDtoOuts = List.of(postDtoOut1, postDtoOut2, postDtoOut3);

        Mockito.when(postService.getFollowingsPosts(1L, 0, 10)).thenReturn(postDtoOuts);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v1/user/{user_id}/followings-posts?page=0&size=10", 1)
                        .contentType(MediaType.APPLICATION_JSON))

                .andExpect(status().isOk())
                .andReturn();

        String responseJson = mvcResult.getResponse().getContentAsString();
        postDtoOuts = objectMapper.readValue(responseJson, new TypeReference<List<PostDtoOut>>(){});

        assertEquals(3, postDtoOuts.size());

        assertEquals(1L, postDtoOuts.get(0).getId());
        assertEquals(userDtoOut1, postDtoOuts.get(0).getUser());
        assertEquals("URL photo1", postDtoOuts.get(0).getPhoto());
        assertEquals("New Description1", postDtoOuts.get(0).getDescription());
    }

    @Test
    public void testAddRepost() throws Exception {

        Mockito.when(postService.saveRepost(eq(1L),eq(4L))).thenReturn(repostDtoOut4);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/v1/user/{user_id}/post/{post_id}/repost", 1, 4)
                        .contentType(MediaType.APPLICATION_JSON))

                .andExpect(status().isOk())
                .andReturn();

        String responseJson = mvcResult.getResponse().getContentAsString();
        PostDtoOut postDtoOut = objectMapper.readValue(responseJson, PostDtoOut.class);

        assertEquals(4L, postDtoOut.getId());
        assertEquals(userDtoOut2, postDtoOut.getUser());
        assertEquals("New Description4", postDtoOut.getDescription());
        assertEquals("URL photo4", postDtoOut.getPhoto());
        assertTrue(postDtoOut.getUsersReposts().contains(userDtoOut1));
        assertTrue(postDtoOut.getIsRepost());
    }

    @Test
    public void testRemoveRepost() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/api/v1/user/{user_id}/post/{post_id}/repost", 1, 4)
                        .contentType(MediaType.APPLICATION_JSON))

                .andExpect(status().isOk());
    }
}