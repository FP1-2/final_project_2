package fs.socialnetworkapi.service;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.TimeZone;

@Service
public class AppTimezone {
  @PostConstruct
  public void started() {
    TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
  }
}
