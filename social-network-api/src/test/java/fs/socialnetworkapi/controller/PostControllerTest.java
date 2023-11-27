package fs.socialnetworkapi.controller;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import fs.socialnetworkapi.component.NotificationCreator;
import fs.socialnetworkapi.dto.user.UserDtoOut;
import fs.socialnetworkapi.dto.post.PostDtoIn;
import fs.socialnetworkapi.dto.post.PostDtoOut;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.enums.TypePost;
import fs.socialnetworkapi.security.SecurityService;
import fs.socialnetworkapi.service.PostService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
public class PostControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private SecurityService securityService;
    @MockBean
    private PostService postService;

    @MockBean
    protected NotificationCreator notificationCreator;
    private String token;
    private UserDtoOut userDtoOut1;
    private PostDtoOut postDtoOut1;
    private PostDtoOut postDtoOut2;
    private PostDtoOut postDtoOut3;
    private PostDtoIn postDtoIn;
    private User user;

    @BeforeEach
    public void setUp() {

        userDtoOut1 = new UserDtoOut();
        userDtoOut1.setId(1L);
        userDtoOut1.setUsername("Jim");

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

        postDtoIn = PostDtoIn.builder()
                .description("New Description1")
                .photo("URL photo1")
                .build();

        user = new User();
        user.setUsername("Jim");
        user.setId(1L);
        user.setRoles("USER");
        user.setEmail("test");

        token = securityService.generateToken(user).getToken();
    }

    @Test
    public void testAddPostWithToken() throws Exception {

       Mockito.when(postService.savePost(any(PostDtoIn.class))).thenReturn(postDtoOut1);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/v1/post")
                        .content(objectMapper.writeValueAsString(postDtoIn))
                        .contentType(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
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
    public void testAddPostWithoutToken() throws Exception {

        Mockito.when(postService.savePost(any(PostDtoIn.class))).thenReturn(postDtoOut1);

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/v1/post")
                        .content(objectMapper.writeValueAsString(postDtoIn))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    public void testAddRepostWithToken() throws Exception {

        Mockito.when(postService.saveByTypeAndOriginalPost(eq(1L), any(PostDtoIn.class), eq(TypePost.REPOST))).thenReturn(postDtoOut1);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/v1/post/{original_post_id}/repost", 1L)
                        .content(objectMapper.writeValueAsString(postDtoIn))
                        .contentType(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
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
    public void testAddRepostWithoutToken() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/v1/post/{original_post_id}/repost", 1L)
                        .content(objectMapper.writeValueAsString(postDtoIn))
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    public void testAddCommentWithToken() throws Exception {

        Mockito.when(postService.saveByTypeAndOriginalPost(eq(1L), any(PostDtoIn.class), eq(TypePost.COMMENT))).thenReturn(postDtoOut1);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/v1/post/{original_post_id}/comment", 1L)
                        .content(objectMapper.writeValueAsString(postDtoIn))
                        .contentType(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
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
    public void testAddCommentWithoutToken() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/v1/post/{original_post_id}/comment", 1L)
                        .content(objectMapper.writeValueAsString(postDtoIn))
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    public void testEditePostWithToken() throws Exception {

        Mockito.when(postService.editePost(any(PostDtoIn.class))).thenReturn(postDtoOut1);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
                        .put("/api/v1/post", 1)
                        .content(objectMapper.writeValueAsString(postDtoIn))
                        .contentType(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))

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
    public void testEditePostWithoutToken() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders
                        .put("/api/v1/post", 1)
                        .content(objectMapper.writeValueAsString(postDtoIn))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    public void testDeletePostWithToken() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/api/v1/post/{post_id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isOk());
    }

    @Test
    public void testDeletePostWithoutToken() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/api/v1/post/{post_id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    public void testGetAllUserPostsWithToken() throws Exception {

        List<PostDtoOut> postDtoOuts = List.of(postDtoOut1, postDtoOut2, postDtoOut3);

        Mockito.when(postService.getProfilePosts(1L,0, 10)).thenReturn(postDtoOuts);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v1/profile-posts/{user_id}?page=0&size=10", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))

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
    public void testGetAllUserPostsWithoutToken() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v1/profile-posts/{user_id}?page=0&size=10", 1L)
                        .contentType(MediaType.APPLICATION_JSON))

                .andExpect(status().isForbidden());
    }

    @Test
    public void testGetAllUserRepostsWithToken() throws Exception {

        List<PostDtoOut> postDtoOuts = List.of(postDtoOut1, postDtoOut2, postDtoOut3);

        Mockito.when(postService.getProfilePostByType(eq(1L),eq(TypePost.REPOST), eq(0), eq(10))).thenReturn(postDtoOuts);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v1/profile-reposts/{user_id}?page=0&size=10", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))

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
    public void testGetAllUserRepostsWithoutToken() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v1/profile-reposts/{user_id}?page=0&size=10", 1L)
                        .contentType(MediaType.APPLICATION_JSON))

                .andExpect(status().isForbidden());
    }

    @Test
    public void testGetAllUserCommentsWithToken() throws Exception {

        List<PostDtoOut> postDtoOuts = List.of(postDtoOut1, postDtoOut2, postDtoOut3);

        Mockito.when(postService.getProfilePostByType(eq(1L),eq(TypePost.COMMENT), eq(0), eq(10))).thenReturn(postDtoOuts);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v1/profile-comments/{user_id}?page=0&size=10", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))

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
    public void testGetAllUserCommentsWithoutToken() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v1/profile-comments/{user_id}?page=0&size=10", 1L)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    public void testPostByUserLikesWithToken() throws Exception {

        List<PostDtoOut> postDtoOuts = List.of(postDtoOut1, postDtoOut2, postDtoOut3);

        Mockito.when(postService.getPostByUserLikes(eq(1L),eq(0),eq(5))).thenReturn(postDtoOuts);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v1/post-user-likes/{user_id}?page=0&size=5", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))

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
    public void testPostByUserLikesWithoutToken() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v1/post-user-likes/{user_id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON))

                .andExpect(status().isForbidden());
    }

    @Test
    public void testGetAllPostsWithoutToken() throws Exception {

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
        assertEquals("URL photo1", postDtoOuts.get(0).getPhoto());
        assertEquals("New Description1", postDtoOuts.get(0).getDescription());
    }

    @Test
    public void testGetCommentsByPostWithToken() throws Exception {

        List<PostDtoOut> postDtoOuts = List.of(postDtoOut1, postDtoOut2, postDtoOut3);

        Mockito.when(postService.getCommentsByPost(eq(1L),eq(0),eq(5))).thenReturn(postDtoOuts);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v1/post/{post_id}/get-comments?page=0&size=5", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))

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
    public void testGetCommentsByPostWithoutToken() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v1/post/{post_id}/get-comments?page=0&size=5", 1L)
                        .contentType(MediaType.APPLICATION_JSON))

                .andExpect(status().isForbidden());
    }
}