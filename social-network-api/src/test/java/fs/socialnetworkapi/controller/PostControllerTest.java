package fs.socialnetworkapi.controller;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import fs.socialnetworkapi.Launcher;
import fs.socialnetworkapi.dto.user.UserDtoOut;
import fs.socialnetworkapi.dto.post.PostDtoIn;
import fs.socialnetworkapi.dto.post.PostDtoOut;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.security.JwtFilter;
import fs.socialnetworkapi.security.SecurityService;
import fs.socialnetworkapi.security.UserAuthenticationBearer;
import fs.socialnetworkapi.security.WebConfigSecurity;
import fs.socialnetworkapi.service.PostService;
import fs.socialnetworkapi.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockFilterChain;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.mock;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(value = PostController.class)
@ContextConfiguration(classes = { Launcher.class, WebConfigSecurity.class })
@AutoConfigureMockMvc
public class PostControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;
//    @Autowired
//    private SecurityService securityService;
//    @Autowired
//    private UserService userService;

    @MockBean
    private PostService postService;

    @MockBean
    private JwtFilter jwtFilter;
    @MockBean
    private SecurityService tokenService;


    private UserDtoOut userDtoOut1;
    private UserDtoOut userDtoOut2;
    private PostDtoOut postDtoOut1;
    private PostDtoOut postDtoOut2;
    private PostDtoOut postDtoOut3;
    private PostDtoOut repostDtoOut4;
    private PostDtoIn postDtoIn;
    private User user;

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
                .build();

        postDtoIn = PostDtoIn.builder()
                .description("New Description1")
                .photo("URL photo1")
                .build();

        user = new User();
        user.setId(1L);
    }

    @Test
    //@WithMockUser()
    public void testAddPost() throws Exception {

//        User principal = new User();
//        principal.setId(1L);
//        principal.setEmail("email");
//        List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("USER"));
//        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(principal, null, authorities);
//        Optional<String> token = Optional.of("Valid_Token");
//        SecurityService.verificationResult verificationResult = mock(SecurityService.verificationResult.class);
//
//        Mockito.when(postService.savePost(any(PostDtoIn.class))).thenReturn(postDtoOut1);
//        //Mockito.when(token.map(tokenService::check)).thenReturn(Optional.of(verificationResult));
//       // Mockito.when(Optional.of(verificationResult).map(UserAuthenticationBearer::create)).thenReturn(Optional.of(usernamePasswordAuthenticationToken));
//
//        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
//                        .post("/api/v1/post2")
//                        .content(objectMapper.writeValueAsString(postDtoIn)
//                        )
//                        .contentType(MediaType.APPLICATION_JSON)
//                                //.header(HttpHeaders.AUTHORIZATION, token)
//
//                        .with(csrf())
//                        //.with(jwt())
//                )
//
//                .andExpect(status().isOk())
//                .andReturn();
//
//        String responseJson = mvcResult.getResponse().getContentAsString();
//        PostDtoOut postDtoOut = objectMapper.readValue(responseJson, PostDtoOut.class);
//
//        assertEquals(1L, postDtoOut.getId());
//        assertEquals(userDtoOut1, postDtoOut.getUser());
//        assertEquals("New Description1", postDtoOut.getDescription());
//        assertEquals("URL photo1", postDtoOut.getPhoto());
    }

    @Test
    public void testEditePost() throws Exception {

//        Mockito.when(postService.editePost(any(PostDtoIn.class))).thenReturn(postDtoOut1);
//
//        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
//                        .put("/api/v1/user/{user_id}/post", 1)
//                        .content(objectMapper.writeValueAsString(postDtoIn))
//                        .contentType(MediaType.APPLICATION_JSON))
//
//                .andExpect(status().isOk())
//                .andReturn();
//
//        String responseJson = mvcResult.getResponse().getContentAsString();
//        PostDtoOut postDtoOut = objectMapper.readValue(responseJson, PostDtoOut.class);
//
//        assertEquals(1L, postDtoOut.getId());
//        assertEquals(userDtoOut1, postDtoOut.getUser());
//        assertEquals("New Description1", postDtoOut.getDescription());
//        assertEquals("URL photo1", postDtoOut.getPhoto());
    }

    @Test
    public void testRemotePost() throws Exception {

//        mockMvc.perform(MockMvcRequestBuilders
//                        .delete("/api/v1/user/{user_id}/post/{post_id}", 1, 1)
//                        .contentType(MediaType.APPLICATION_JSON))
//
//                .andExpect(status().isOk());
    }

    @Test
    public void testGetAllUserPosts() throws Exception {
//
//        List<PostDtoOut> postDtoOuts = List.of(postDtoOut1, postDtoOut2, postDtoOut3);
//
//        Mockito.when(postService.getProfilePosts(0, 10)).thenReturn(postDtoOuts);
//
//        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
//                        .get("/api/v1/user/{user_id}/posts?page=0&size=10", 1)
//                        .contentType(MediaType.APPLICATION_JSON))
//
//                .andExpect(status().isOk())
//                .andReturn();
//
//        String responseJson = mvcResult.getResponse().getContentAsString();
//        postDtoOuts = objectMapper.readValue(responseJson, new TypeReference<List<PostDtoOut>>(){});
//
//        assertEquals(3, postDtoOuts.size());
//
//        assertEquals(1L, postDtoOuts.get(0).getId());
//        assertEquals(userDtoOut1, postDtoOuts.get(0).getUser());
//        assertEquals("URL photo1", postDtoOuts.get(0).getPhoto());
//        assertEquals("New Description1", postDtoOuts.get(0).getDescription());
    }

    @Test
    public void testGetAllPosts() throws Exception {

//        List<PostDtoOut> postDtoOuts = List.of(postDtoOut1, postDtoOut2, postDtoOut3);
//
//        //Mockito.when(postService.getAllPost(0, 10)).thenReturn(postDtoOuts);
//
//        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
//                        .get("/api/v1/all-posts?page=0&size=10")
//                        .contentType(MediaType.APPLICATION_JSON))
//
//                .andExpect(status().isOk())
//                .andReturn();
//
//        String responseJson = mvcResult.getResponse().getContentAsString();
//        postDtoOuts = objectMapper.readValue(responseJson, new TypeReference<List<PostDtoOut>>(){});
//
//        assertEquals(3, postDtoOuts.size());
//
//        assertEquals(1L, postDtoOuts.get(0).getId());
//      //  assertEquals(userDtoOut1, postDtoOuts.get(0).getUser());
//        assertEquals("URL photo1", postDtoOuts.get(0).getPhoto());
//        assertEquals("New Description1", postDtoOuts.get(0).getDescription());
    }

    @Test
    public void testGetFollowingsPosts() throws Exception {

//        List<PostDtoOut> postDtoOuts = List.of(postDtoOut1, postDtoOut2, postDtoOut3);
//
//       // Mockito.when(postService.getFollowingsPosts(1L, 0, 10)).thenReturn(postDtoOuts);
//
//        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
//                        .get("/api/v1/user/{user_id}/followings-posts?page=0&size=10", 1)
//                        .contentType(MediaType.APPLICATION_JSON))
//
//                .andExpect(status().isOk())
//                .andReturn();
//
//        String responseJson = mvcResult.getResponse().getContentAsString();
//        postDtoOuts = objectMapper.readValue(responseJson, new TypeReference<List<PostDtoOut>>(){});
//
//        assertEquals(3, postDtoOuts.size());
//
//        assertEquals(1L, postDtoOuts.get(0).getId());
//        //assertEquals(userDtoOut1, postDtoOuts.get(0).getUser());
//        assertEquals("URL photo1", postDtoOuts.get(0).getPhoto());
//        assertEquals("New Description1", postDtoOuts.get(0).getDescription());
    }

    @Test
    public void testAddRepost() throws Exception {

//        //Mockito.when(postService.saveRepost(eq(1L),eq(4L))).thenReturn(repostDtoOut4);
//
//        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
//                        .post("/api/v1/user/{user_id}/post/{post_id}/repost", 1, 4)
//                        .contentType(MediaType.APPLICATION_JSON))
//
//                .andExpect(status().isOk())
//                .andReturn();
//
//        String responseJson = mvcResult.getResponse().getContentAsString();
//        PostDtoOut postDtoOut = objectMapper.readValue(responseJson, PostDtoOut.class);
//
//        assertEquals(4L, postDtoOut.getId());
//        assertEquals(userDtoOut2, postDtoOut.getUser());
//        assertEquals("New Description4", postDtoOut.getDescription());
//        assertEquals("URL photo4", postDtoOut.getPhoto());
//       // assertTrue(postDtoOut.getUsersIdsReposts().contains(userDtoOut1.getId()));
//        //assertTrue(postDtoOut.getIsRepost());
    }

}