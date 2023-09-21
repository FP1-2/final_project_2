package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.dto.UserDtoOut;
import fs.socialnetworkapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/")
public class UserController {

  private final UserService userService;

  @GetMapping("user/{current_user_id}/subscribe/{user_id}")
  public ResponseEntity<?> subscribe(@PathVariable("current_user_id") Long currentUserId,
                                     @PathVariable("user_id") Long userId) {
    userService.subscribe(currentUserId, userId);
    return ResponseEntity.ok().build();
  }
  @GetMapping("user/{current_user_id}/unsubscribe/{user_id}")
  public ResponseEntity<?> unsubscribe(@PathVariable("current_user_id") Long currentUserId,
                                     @PathVariable("user_id") Long userId) {
    userService.unsubscribe(currentUserId, userId);
    return ResponseEntity.ok().build();
  }

  @GetMapping("user/{current_user_id}/followers") //підписчики
  public ResponseEntity<List<UserDtoOut>> getFollowers(@PathVariable("current_user_id") Long currentUserId) {
    List<UserDtoOut> followers= userService.getFollowers(currentUserId);
    return ResponseEntity.ok(followers);
  }

  @GetMapping("user/{current_user_id}/followings") //підписки
  public ResponseEntity<List<UserDtoOut>> getFollowings(@PathVariable("current_user_id") Long currentUserId) {
    List<UserDtoOut> followings= userService.getFollowings(currentUserId);
    return ResponseEntity.ok(followings);
  }

}
