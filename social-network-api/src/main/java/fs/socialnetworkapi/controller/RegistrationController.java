package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequiredArgsConstructor
public class RegistrationController {
  @Autowired
  private UserService userService;

  //  @GetMapping("/registration")
  //  public String registration() {
  //    return "registration";
  //  }

  //  @PostMapping("/registration")
  //  public String addUser(User user, Map<String, Object> model) {
  //    if (!userService.addUser(user)) {
  //      model.put("message", "User exists!");
  //      return "registration";
  //    }
  //    return "activation";
  //  }

  @PostMapping("/registration")
  public void create(@RequestBody User user) {
    userService.addUser(user);
  }


  @GetMapping("/activate/{code}")
  public String activate(Model model, @PathVariable String code) {
    boolean isActivated = userService.activateUser(code);

    if (isActivated) {
      model.addAttribute("message", "User successfully activated");
    } else {
      model.addAttribute("message", "Activation code is not found!");
    }
    return "login";
  }
}
