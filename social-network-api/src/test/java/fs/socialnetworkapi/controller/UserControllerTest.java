package fs.socialnetworkapi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import fs.socialnetworkapi.Launcher;
import fs.socialnetworkapi.dto.user.UserDtoOut;
import fs.socialnetworkapi.security.JwtFilter;
import fs.socialnetworkapi.security.SecurityService;
import fs.socialnetworkapi.security.WebConfigSecurity;
import fs.socialnetworkapi.service.AuthorizationService;
import fs.socialnetworkapi.service.PasswordResetService;
import fs.socialnetworkapi.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(UserController.class)
//@ContextConfiguration(classes = { Launcher.class, WebConfigSecurity.class })
//@AutoConfigureMockMvc
//@Import({WebConfigSecurity.class})
class UserControllerTest {

//  @Autowired
//  private WebApplicationContext context;

  @Autowired
  private MockMvc mockMvc;
  @Autowired
  private ObjectMapper objectMapper;
  @MockBean
  private UserService userService;
  @MockBean
  private AuthorizationService authorizationService;
  @MockBean
  private PasswordResetService passwordResetService;
  @MockBean
  private JwtFilter jwtFilter;
//
//  @InjectMocks
//  private UserController userController;

  @BeforeEach
  void setUp() {
//    MockitoAnnotations.openMocks(this);
//    mockMvc = MockMvcBuilders
//            .webAppContextSetup(context)
//            .apply(springSecurity())
//            .build();
  }

  @Test
  @WithMockUser()
  void testSubscribe() throws Exception {
    // Arrange
//    Long currentUserId = 1L;
//    Long userId = 2L;
//
//    Mockito.doNothing().when(userService).subscribe(userId);
//    mockMvc.perform(MockMvcRequestBuilders
//                        .get("/api/v1/subscribe/{subscribe_user_id}", userId)
//                        .contentType(MediaType.APPLICATION_JSON)
//                                //.header(HttpHeaders.AUTHORIZATION, token)
//
//                        //.with(csrf())
//                        //.with(jwt()))
//            )
//                .andExpect(status().isOk());
//
//    verify(userService, times(1)).subscribe(userId);
  }

  @Test
  void testUnsubscribe() {
    // Arrange
//    Long currentUserId = 1L;
//    Long userId = 2L;
//
//    // Act
//    ResponseEntity<?> responseEntity = userController.unsubscribe(userId);
//
//    // Assert
//    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
//    verify(userService, times(1)).unsubscribe(userId);
  }

  @Test
  void testGetFollowers() {
    // Arrange
//    Long currentUserId = 1L;
//    List<UserDtoOut> followers = new ArrayList<>();
//    when(userService.getFollowers()).thenReturn(followers);
//
//    // Act
//    ResponseEntity<List<UserDtoOut>> responseEntity = userController.getFollowers();
//
//    // Assert
//    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
//    assertEquals(followers, responseEntity.getBody());
//    verify(userService, times(1)).getFollowers();
  }

  @Test
  void testGetFollowings() {
    // Arrange
//    Long currentUserId = 1L;
//    List<UserDtoOut> followings = new ArrayList<>();
//    when(userService.getFollowings()).thenReturn(followings);
//
//    // Act
//    ResponseEntity<List<UserDtoOut>> responseEntity = userController.getFollowings();
//
//    // Assert
//    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
//    assertEquals(followings, responseEntity.getBody());
//    verify(userService, times(1)).getFollowings();
  }
}
