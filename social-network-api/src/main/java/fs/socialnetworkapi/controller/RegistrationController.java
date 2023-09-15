package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
public class RegistrationController {
    @Autowired
    private UserService userService;

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
