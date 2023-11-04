package fs.socialnetworkapi.config;

import fs.socialnetworkapi.dto.message.MessageDtoOut;
import fs.socialnetworkapi.dto.notification.NotificationDtoIn;
import fs.socialnetworkapi.dto.user.UserDtoOut;
import fs.socialnetworkapi.dto.post.OriginalPostDto;
import fs.socialnetworkapi.dto.post.PostDtoOut;
import fs.socialnetworkapi.entity.Chat;
import fs.socialnetworkapi.entity.Message;
import fs.socialnetworkapi.entity.Post;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.entity.Notification;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {
  @Bean
  public ModelMapper modelMapper() {

    ModelMapper modelMapper = new ModelMapper();
    modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

    //User
    modelMapper.createTypeMap(User.class, UserDtoOut.class);

    modelMapper.createTypeMap(Post.class, PostDtoOut.class);

    modelMapper.createTypeMap(Post.class, OriginalPostDto.class);

    modelMapper.createTypeMap(NotificationDtoIn.class, Notification.class);


    //Message
    Converter<Chat, Long> convertChatToChatId = (src) -> src.getSource().getId();

    modelMapper.createTypeMap(Message.class, MessageDtoOut.class)
            .addMappings(mapper -> mapper.using(convertChatToChatId)
                    .map(Message::getChat, MessageDtoOut::setChatId));

    return modelMapper;
  }

}
