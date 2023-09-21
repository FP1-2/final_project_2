package fs.socialnetworkapi.advice;

import fs.socialnetworkapi.exception.PostNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class ApplicationExceptionHandlerTest {

  @Mock
  private PostNotFoundException postNotFoundException;

  @InjectMocks
  private ApplicationExceptionHandler applicationExceptionHandler;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void testHandelPostNotFoundEx(){

    // Arrange
    PostNotFoundException exception = new PostNotFoundException("Post not found");

    // Act
    Map<String, Object> result = applicationExceptionHandler.handelBusinessEx(exception);

    assertEquals("Post not found", result.get("errorMessage"));

  }

  @Test
  void testHandelUserNotFoundEx(){

    // Arrange
    PostNotFoundException exception = new PostNotFoundException("User not found");

    // Act
    Map<String, Object> result = applicationExceptionHandler.handelBusinessEx(exception);

    assertEquals("User not found", result.get("errorMessage"));

  }

}