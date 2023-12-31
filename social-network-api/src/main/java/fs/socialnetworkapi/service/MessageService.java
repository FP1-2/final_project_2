package fs.socialnetworkapi.service;

import fs.socialnetworkapi.dto.message.CreateChatDtoIn;
import fs.socialnetworkapi.dto.message.MessageDtoIn;
import fs.socialnetworkapi.dto.message.MessageDtoOut;
import fs.socialnetworkapi.component.NotificationCreator;
import fs.socialnetworkapi.dto.user.UserDtoOut;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.entity.Message;
import fs.socialnetworkapi.entity.ChatUser;
import fs.socialnetworkapi.entity.Chat;
import fs.socialnetworkapi.repos.ChatRepo;
import fs.socialnetworkapi.repos.ChatUserRepo;
import fs.socialnetworkapi.repos.MessageRepo;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MessageService {

  private final ChatRepo chatRepo;
  private final ChatUserRepo chatUserRepo;
  private final MessageRepo messageRepo;
  private final ModelMapper mapper;
  private final UserService userService;

  @Autowired
  private final NotificationCreator notificationCreator;

  private User getUser() {
    return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }

  public Optional<Long> createChat(CreateChatDtoIn createChatDtoIn) {

    if (createChatDtoIn.getMembersChat().isEmpty()) {
      return Optional.empty();
    }

    User user = getUser();

    Chat newChat = chatRepo.save(new Chat());
    chatUserRepo.save(new ChatUser(user.getId(), newChat.getId()));

    createChatDtoIn.getMembersChat()
            .forEach(memberChat -> chatUserRepo.save(
                    new ChatUser(memberChat, newChat.getId())));

    return Optional.of(newChat.getId());

  }

  public Optional<Chat> addMembersChat(Long chatId, CreateChatDtoIn createChatDtoIn) {

    Chat chat = findById(chatId);

    if (createChatDtoIn.getMembersChat().isEmpty()) {
      return Optional.empty();
    }

    createChatDtoIn.getMembersChat().forEach(memberChat -> chatUserRepo.save(new ChatUser(memberChat, chat.getId())));

    return Optional.of(chat);
  }

  public List<UserDtoOut> getMembersChat(Long chatId) {
    return chatRepo.findById(chatId)
           .map(chat -> chat.getChatUsers()
                   .stream()
                   .map(ChatUser::getUser)
                   .map(user -> mapper.map(user, UserDtoOut.class))
                   .toList()).orElse(new ArrayList<>());
  }

  public MessageDtoOut addMessage(MessageDtoIn messageDtoIn) {

    User user = getUser();

    return addMessage(messageDtoIn, user);
  }

  public MessageDtoOut addMessage(MessageDtoIn messageDtoIn, User user) {
    User current = userService.findById(user.getId());

    Chat chat = findById(messageDtoIn.getChatId());

    Message message = new Message();
    message.setChat(chat);
    message.setText(messageDtoIn.getText());
    message.setUser(current);
    Message messageToSave = messageRepo.save(message);
    sendMessageNotification(messageToSave);

    return mapper.map(messageToSave,MessageDtoOut.class);
  }

  public List<MessageDtoOut> getMessagesChat(Long chatId, Integer page, Integer size) {

    Chat chat = findById(chatId);
    Pageable pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));

    Page<Message>  allMessage = messageRepo.findByChat(chat, pageRequest);
    return allMessage
            .stream()
            .map(message -> mapper.map(message, MessageDtoOut.class))
            .toList();
  }

  public List<Long> getChatsByUser(Long userId) {

    User user = userService.findById(userId);
    List<ChatUser> chatUsers = chatUserRepo.findByUser(user);

    return chatUsers.stream().map(ChatUser::getChatId).toList();
  }

  private void sendMessageNotification(Message message) {
    notificationCreator.messageNotification(message);
  }

  private Chat findById(Long chatId) {

    return chatRepo.findById(chatId)
            .orElseThrow(()-> new EntityNotFoundException(
                    String.format("Unable to find Chat with id %d", chatId)));
  }

}
