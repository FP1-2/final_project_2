package fs.socialnetworkapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;

@SpringBootApplication
public class Launcher {
  public static void main(String[] args) throws IOException {
    SpringApplication.run(Launcher.class, args);
  }

}
