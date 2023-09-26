package fs.socialnetworkapi.component;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class AppLink {
  @Value("${myapp.baseUrl}")
  private String baseUrl;
}
