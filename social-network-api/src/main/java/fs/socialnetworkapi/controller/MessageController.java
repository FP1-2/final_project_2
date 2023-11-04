package fs.socialnetworkapi.controller;

import fs.socialnetworkapi.dto.message.CreateChatDtoIn;
import fs.socialnetworkapi.dto.message.MessageDtoIn;
import fs.socialnetworkapi.dto.message.MessageDtoOut;
import fs.socialnetworkapi.dto.user.UserDtoOut;
import fs.socialnetworkapi.entity.Chat;
import fs.socialnetworkapi.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/")
public class MessageController {

  private final SimpMessagingTemplate messagingTemplate;
  private final MessageService messageService;

  public void reply(MessageDtoOut messageDtoOut) {
    messagingTemplate.convertAndSend("/topic/some-topic", messageDtoOut);
  }

  @PostMapping("create-chat")
  public ResponseEntity<?> createChat(@RequestBody CreateChatDtoIn createChatDtoIn) {

    Optional<Long> chatId = messageService.createChat(createChatDtoIn);

    return chatId.isPresent()
            ? (ResponseEntity.ok(chatId.get()))
            : (ResponseEntity.badRequest().body(Map.of("error", "chat members is empty")));

  }

  @GetMapping("get-members-chat/{chatId}")
  public ResponseEntity<List<UserDtoOut>> getMembersChat(@PathVariable("chatId") Long chatId) {

    return ResponseEntity.ok(messageService.getMembersChat(chatId));

  }

  @GetMapping("get-chats-user/{userId}")
  public ResponseEntity<List<Long>> getChatsByUser(@PathVariable("userId") Long userId) {

    return ResponseEntity.ok(messageService.getChatsByUser(userId));

  }

  @PostMapping("add-members-chat/{chatId}")
  public ResponseEntity<?> addMembersChat(@PathVariable("chatId") Long chatId,
                                          @RequestBody CreateChatDtoIn createChatDtoIn) {

    Optional<Chat> chat = messageService.addMembersChat(chatId, createChatDtoIn);

    return chat.isPresent()
            ? (ResponseEntity.ok(chat.get().getId()))
            : (ResponseEntity.badRequest().body(Map.of("errorMessage", "Array members is empty")));

  }

  @GetMapping("get-messages-chat/{chatId}")
  public ResponseEntity<List<MessageDtoOut>> getMessagesChat(@PathVariable("chatId") Long chatId) {

    return ResponseEntity.ok(messageService.getMessagesChat(chatId));

  }

  @PostMapping("message")
  public ResponseEntity<MessageDtoOut> addMessage(@RequestBody MessageDtoIn message) {
    MessageDtoOut messageDtoOut = messageService.addMessage(message);
    reply(messageDtoOut);
    return ResponseEntity.ok(messageDtoOut);
  }


}
