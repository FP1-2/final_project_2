package fs.socialnetworkapi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import fs.socialnetworkapi.dto.UserDtoIn;
import fs.socialnetworkapi.dto.UserDtoOut;
import fs.socialnetworkapi.dto.post.PostDtoIn;
import fs.socialnetworkapi.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(RegistrationController.class)
class RegistrationControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockBean
  private UserService userService;

  @Test
  void testCreateUser() throws Exception {
    // Create a UserDtoIn object with valid data
    UserDtoIn userDtoIn = new UserDtoIn();
    userDtoIn.setFirstName("John");
    userDtoIn.setLastName("Doe");
    userDtoIn.setEmail("john@example.com");
    userDtoIn.setBirthday("1990-01-01");

    UserDtoOut userOut = new UserDtoOut();
    userOut.setId(1L);
    userOut.setFirstName("John");
    userOut.setLastName("Doe");
    userOut.setEmail("john@example.com");
    userOut.setBirthday("1990-01-01");

    String userDtoInJson = objectMapper.writeValueAsString(userDtoIn);
    Mockito.when(userService.addUser(any(UserDtoIn.class))).thenReturn(userOut);

    MvcResult result = mockMvc.perform(MockMvcRequestBuilders
        .post("/api/v1/registration")
        .content(userDtoInJson)
        .contentType(MediaType.APPLICATION_JSON)
        .accept(MediaType.APPLICATION_JSON))
      .andExpect(status().isOk())
      .andReturn();

    String responseJson = result.getResponse().getContentAsString();
    UserDtoOut userDtoOut = objectMapper.readValue(responseJson, UserDtoOut.class);

    // Verify that the user was created and returned correctly
    assertEquals("John", userDtoOut.getFirstName());
    assertEquals("Doe", userDtoOut.getLastName());
    assertEquals("john@example.com", userDtoOut.getEmail());
    assertEquals("1990-01-01", userDtoOut.getBirthday());
}
}
