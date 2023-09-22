package fs.socialnetworkapi.controller;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import fs.socialnetworkapi.dto.post.PostDtoIn;
import fs.socialnetworkapi.dto.post.PostDtoOut;
import fs.socialnetworkapi.service.PostService;
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

import static org.junit.jupiter.api.Assertions.assertEquals;
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

    @Test
    public void testAddPost() throws Exception {

        PostDtoIn postDtoIn = PostDtoIn.builder()
                .description("New Description")
                .photo("URL photo")
                .build();

        PostDtoOut postDtoOut1 = PostDtoOut.builder()
                .id(1L)
                .userId(1L)
                .description("New Description")
                .photo("URL photo")
                .build();

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
        assertEquals(1L, postDtoOut.getUserId());
        assertEquals("New Description", postDtoOut.getDescription());
        assertEquals("URL photo", postDtoOut.getPhoto());
    }

    @Test
    public void testEditePost() throws Exception {

        PostDtoIn postDtoIn = PostDtoIn.builder()
                .id(1L)
                .userId(1L)
                .description("New Description")
                .photo("URL photo")
                .build();

        PostDtoOut postDtoOut = PostDtoOut.builder()
                .id(1L)
                .userId(1L)
                .description("New Description")
                .photo("URL photo")
                .build();

        Mockito.when(postService.editePost(any(PostDtoIn.class))).thenReturn(postDtoOut);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
                        .put("/api/v1/user/{user_id}/post", 1)
                        .content(objectMapper.writeValueAsString(postDtoIn))
                        .contentType(MediaType.APPLICATION_JSON))

                .andExpect(status().isOk())
                .andReturn();

        String responseJson = mvcResult.getResponse().getContentAsString();
        postDtoOut = objectMapper.readValue(responseJson, PostDtoOut.class);

        assertEquals(1L, postDtoOut.getId());
        assertEquals(1L, postDtoOut.getUserId());
        assertEquals("New Description", postDtoOut.getDescription());
        assertEquals("URL photo", postDtoOut.getPhoto());
    }

    @Test
    public void testRemotePost() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/api/v1/user/{user_id}/post/{post_id}", 1, 1)
                        .contentType(MediaType.APPLICATION_JSON))

                .andExpect(status().isOk());
    }

    @Test
    public void testGetAllPosts() throws Exception {

        PostDtoOut postDtoOut1 = PostDtoOut.builder()
                .id(1L)
                .userId(1L)
                .description("New Description1")
                .photo("URL photo1")
                .build();
        PostDtoOut postDtoOut2 = PostDtoOut.builder()
                .id(2L)
                .userId(1L)
                .description("New Description2")
                .photo("URL photo2")
                .build();
        PostDtoOut postDtoOut3 = PostDtoOut.builder()
                .id(3L)
                .userId(1L)
                .description("New Description3")
                .photo("URL photo3")
                .build();

        List<PostDtoOut> postDtoOuts = List.of(postDtoOut1, postDtoOut2, postDtoOut3);

        Mockito.when(postService.getAllPosts(1L, 0, 10)).thenReturn(postDtoOuts);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v1/user/{user_id}/posts?page=0&size=10", 1)
                        .contentType(MediaType.APPLICATION_JSON))

                .andExpect(status().isOk())
                .andReturn();

        String responseJson = mvcResult.getResponse().getContentAsString();
        postDtoOuts = objectMapper.readValue(responseJson, new TypeReference<List<PostDtoOut>>(){});

        assertEquals(3, postDtoOuts.size());

        assertEquals(1L, postDtoOuts.get(0).getId());
        assertEquals(1L, postDtoOuts.get(0).getUserId());
        assertEquals("URL photo1", postDtoOuts.get(0).getPhoto());
        assertEquals("New Description1", postDtoOuts.get(0).getDescription());
    }
}