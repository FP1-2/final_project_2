package fs.socialnetworkapi.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import fs.socialnetworkapi.dto.user.UserDtoOut;
import fs.socialnetworkapi.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(UserController.class)
public class UserControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockBean
  private UserService userService;

  @Test
  public void testSubscribe() throws Exception {

   mockMvc.perform(MockMvcRequestBuilders
           .get("/api/v1/user/{current_user_id}/subscribe/{user_id}", 1, 2)
           .contentType(MediaType.APPLICATION_JSON))
           .andExpect(status().isOk());
   verify(userService, times(1)).subscribe(1L, 2L);

  }

  @Test
  public void testUnsubscribe() throws Exception {

    mockMvc.perform(MockMvcRequestBuilders
                    .get("/api/v1/user/{current_user_id}/unsubscribe/{user_id}", 1, 2)
                    .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk());
    verify(userService, times(1)).unsubscribe(1L, 2L);

  }

  @Test
  public void testGetFollowers() throws Exception {

    MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
                    .get("/api/v1/user/{current_user_id}/followers", 1)
                    .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andReturn();

    String responseJson = mvcResult.getResponse().getContentAsString();
    List<UserDtoOut> userDtoOuts = objectMapper.readValue(responseJson, new TypeReference<List<UserDtoOut>>(){});
    verify(userService, times(1)).getFollowers(1L);

  }

  @Test
  public void testGetFollowings() throws Exception {

    MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
                    .get("/api/v1/user/{current_user_id}/followings", 1)
                    .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andReturn();

    String responseJson = mvcResult.getResponse().getContentAsString();
    List<UserDtoOut> userDtoOuts = objectMapper.readValue(responseJson, new TypeReference<List<UserDtoOut>>(){});
    verify(userService, times(1)).getFollowings(1L);

  }
}
