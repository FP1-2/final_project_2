package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.dto.UserDtoIn;
import fs.socialnetworkapi.dto.UserDtoOut;
import fs.socialnetworkapi.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequiredArgsConstructor
public class RegistrationController {
  private static final String test = "test";

  @Autowired
  private UserService userService;

  @PostMapping("/api/v1/registration")
  public ResponseEntity<UserDtoOut> create(@Valid @RequestBody UserDtoIn userDtoIn) {
    return ResponseEntity.ok(userService.addUser(userDtoIn));
  }


  @GetMapping("/api/v1/activate/{code}")
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
