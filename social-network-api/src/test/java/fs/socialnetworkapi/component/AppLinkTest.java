package fs.socialnetworkapi.component;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class AppLinkTest {

  @Autowired
  private AppLink appLink;

  @Value("${myapp.baseUrl}")
  private String baseUrl;

  @Test
  public void testGetBaseUrl() {
    String expectedBaseUrl = baseUrl;
    String actualBaseUrl = appLink.getBaseUrl();
    assertEquals(expectedBaseUrl, actualBaseUrl);
  }
}