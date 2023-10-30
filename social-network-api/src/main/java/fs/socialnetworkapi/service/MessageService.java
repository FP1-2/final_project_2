package fs.socialnetworkapi.service;

import fs.socialnetworkapi.dto.message.CreateChatDtoIn;
import fs.socialnetworkapi.dto.message.MessageDtoIn;
import fs.socialnetworkapi.dto.message.MessageDtoOut;
import fs.socialnetworkapi.dto.notification.NotificationCreator;
import fs.socialnetworkapi.dto.user.UserDtoOut;
import fs.socialnetworkapi.entity.Notification;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.entity.Message;
import fs.socialnetworkapi.entity.ChatUser;
import fs.socialnetworkapi.entity.Chat;
import fs.socialnetworkapi.exception.ChatNotFoundException;
import fs.socialnetworkapi.repos.ChatRepo;
import fs.socialnetworkapi.repos.ChatUserRepo;
import fs.socialnetworkapi.repos.MessageRepo;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
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
  private final NotificationService notificationService;

  public Optional<Long> createChat(CreateChatDtoIn createChatDtoIn) {

    if (createChatDtoIn.getMembersChat().size() == 0) {
      return Optional.empty();
    }

    User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    Chat newChat = chatRepo.save(new Chat());
    ChatUser chatUser = new ChatUser(user.getId(), newChat.getId());

    chatUser = chatUserRepo.save(chatUser);

    createChatDtoIn.getMembersChat()
            .forEach(memberChat -> chatUserRepo.save(
                    new ChatUser(memberChat, newChat.getId())));

    return Optional.of(newChat.getId());

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

    User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    Chat chat = chatRepo.findById(messageDtoIn.getChatId())
            .orElseThrow(()-> new ChatNotFoundException(
                    String.format("Chat with id: %d not found", messageDtoIn.getChatId())));
    Message message = new Message();
    message.setChat(chat);
    message.setText(messageDtoIn.getText());
    message.setUser(user);
    Message messageToSave = messageRepo.save(message);
    sendMessageNotification(messageToSave);

    return mapper.map(messageToSave,MessageDtoOut.class);
  }

  public List<MessageDtoOut> getMessagesChat(Long chatId) {

    Chat chat = chatRepo.findById(chatId)
            .orElseThrow(()-> new ChatNotFoundException(
                    String.format("Chat with id: %d not found", chatId)));

    return chat.getMessages()
            .stream()
            .map(message -> mapper.map(message, MessageDtoOut.class))
            .toList();
  }

  public void deleteMessage(Message message) {
    messageRepo.delete(message);
    notificationService.deleteByMessageId(message.getId());
  }

  private void sendMessageNotification(Message message) {
    List<Notification> notifications = new NotificationCreator().messageNotification(message);
  }

}
