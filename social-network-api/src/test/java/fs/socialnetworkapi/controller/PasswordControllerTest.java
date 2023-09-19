package fs.socialnetworkapi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import fs.socialnetworkapi.entity.PasswordResetRequest;
import fs.socialnetworkapi.service.PasswordResetService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class PasswordControllerTest {

  private MockMvc mockMvc;

  @Mock
  private PasswordResetService passwordResetService;

  @InjectMocks
  private PasswordController passwordController;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.initMocks(this);
    mockMvc = MockMvcBuilders.standaloneSetup(passwordController).build();
  }

  @Test
  public void testRequestPasswordReset() throws Exception {
    String email = "test@example.com";

    mockMvc.perform(MockMvcRequestBuilders.post("/reset/request")
                    .content(email)
                    .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk());

    verify(passwordResetService).setNewActivationCode(email);
  }

  @Test
  public void testConfirmPasswordReset() throws Exception {
    PasswordResetRequest request = new PasswordResetRequest();
    request.setActivationCode("12345");
    request.setNewPassword("newPassword");

    mockMvc.perform(MockMvcRequestBuilders.post("/reset/confirm")
                    .content(asJsonString(request))
                    .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk());

    verify(passwordResetService).changePassword(request.getActivationCode(), request.getNewPassword());
  }

  private String asJsonString(final Object obj) {
    try {
      return new ObjectMapper().writeValueAsString(obj);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }
}
