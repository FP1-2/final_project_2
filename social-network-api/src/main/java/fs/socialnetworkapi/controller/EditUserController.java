package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.dto.user.UserDtoIn;
import fs.socialnetworkapi.dto.user.UserDtoOut;
import fs.socialnetworkapi.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequiredArgsConstructor
public class EditUserController {

  @Autowired
  private UserService userService;

  @PostMapping("/api/v1/edit")
  public ResponseEntity<UserDtoOut> edit(@Valid @RequestBody UserDtoIn userDtoIn ) {
    return ResponseEntity.ok(userService.editUser(userDtoIn));
  }
}