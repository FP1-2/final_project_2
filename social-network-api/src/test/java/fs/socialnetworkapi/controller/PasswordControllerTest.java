//package fs.socialnetworkapi.controller;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import fs.socialnetworkapi.dto.EmailRequest;
//import fs.socialnetworkapi.dto.password.PasswordResetRequest;
//import fs.socialnetworkapi.service.PasswordResetService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//
//import static org.mockito.Mockito.verify;
//import static org.mockito.Mockito.verifyNoMoreInteractions;
//import static org.mockito.Mockito.when;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
//import static org.hamcrest.Matchers.equalTo;
//
//public class PasswordControllerTest {
//
//  private MockMvc mockMvc;
//
//  @Mock
//  private PasswordResetService passwordResetService;
//
//  @InjectMocks
//  private PasswordController passwordController;
//
//  @BeforeEach
//  public void setUp() {
//    MockitoAnnotations.initMocks(this);
//    mockMvc = MockMvcBuilders.standaloneSetup(passwordController).build();
//  }
//
//  @Test
//  public void testRequestPasswordResetSuccess() throws Exception {
//    EmailRequest emailRequest = new EmailRequest();
//    emailRequest.setEmail("test@example.com");
//
//    when(passwordResetService.setNewActivationCode(emailRequest.getEmail())).thenReturn(true);
//
//    mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/reset/request")
//                    .content(asJsonString(emailRequest))
//                    .contentType(MediaType.APPLICATION_JSON))
//            .andExpect(status().isOk());
//
//    verify(passwordResetService).setNewActivationCode(emailRequest.getEmail());
//    verifyNoMoreInteractions(passwordResetService);
//  }
//
//  @Test
//  public void testRequestPasswordResetFailure() throws Exception {
//    EmailRequest emailRequest = new EmailRequest();
//    emailRequest.setEmail("test@example.com");
//
//    when(passwordResetService.setNewActivationCode(emailRequest.getEmail())).thenReturn(false);
//
//    mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/reset/request")
//                    .content(asJsonString(emailRequest))
//                    .contentType(MediaType.APPLICATION_JSON))
//            .andExpect(status().isBadRequest())
//            .andExpect(content().string(equalTo("No such email")));
//
//    verify(passwordResetService).setNewActivationCode(emailRequest.getEmail());
//    verifyNoMoreInteractions(passwordResetService);
//  }
//
//  @Test
//  public void testConfirmPasswordResetSuccess() throws Exception {
////    PasswordResetRequest request = new PasswordResetRequest();
////    request.setActivationCode("12345");
////    request.setNewPassword("newPassword");
////
////    when(passwordResetService.changePassword(request.getActivationCode(), request.getNewPassword()))
////            .thenReturn(true);
////
////    mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/reset/confirm")
////                    .content(asJsonString(request))
////                    .contentType(MediaType.APPLICATION_JSON))
////            .andExpect(status().isOk());
////
////    verify(passwordResetService).changePassword(request.getActivationCode(), request.getNewPassword());
////    verifyNoMoreInteractions(passwordResetService);
//  }
//
//  @Test
//  public void testConfirmPasswordResetFailure() throws Exception {
////    PasswordResetRequest request = new PasswordResetRequest();
////    request.setActivationCode("12345");
////    request.setNewPassword("newPassword");
////
////    when(passwordResetService.changePassword(request.getActivationCode(), request.getNewPassword()))
////            .thenReturn(false);
////
////    mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/reset/confirm")
////                    .content(asJsonString(request))
////                    .contentType(MediaType.APPLICATION_JSON))
////            .andExpect(status().isBadRequest())
////            .andExpect(content().string(equalTo("Try again")));
////
////    verify(passwordResetService).changePassword(request.getActivationCode(), request.getNewPassword());
////    verifyNoMoreInteractions(passwordResetService);
//  }
//
//  private String asJsonString(final Object obj) {
//    try {
//      return new ObjectMapper().writeValueAsString(obj);
//    } catch (Exception e) {
//      throw new RuntimeException(e);
//    }
//  }
//}
