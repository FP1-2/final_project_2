package fs.socialnetworkapi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class FrontendController {
  @GetMapping
  public String trueIndex() {
    return "forward:/index.html";
  }

  @GetMapping("/signIn")
  public String signIn() {
    return "forward:/index.html";
  }

  @GetMapping("/home")
  public String home() {
    return "forward:/index.html";
  }

  @GetMapping("/profile/*")
  public String profile() {
    return "forward:/index.html";
  }

  @GetMapping("/notifications")
  public String notifications() {
    return "forward:/index.html";
  }

  @GetMapping("/messages")
  public String messages() {
    return "forward:/index.html";
  }

  @GetMapping("/favourites")
  public String favourites() {
    return "forward:/index.html";
  }

  @GetMapping("/post/*")
  public String post() {
    return "forward:/index.html";
  }

  @GetMapping("*/{subpath:[^\\.]+}")
  public String fakeIndex() {
    return "forward:/index.html";
  }

}
