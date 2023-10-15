package fs.socialnetworkapi.config;

import fs.socialnetworkapi.dto.message.MessageDtoOut;
import fs.socialnetworkapi.dto.user.UserDtoOut;
import fs.socialnetworkapi.dto.post.OriginalPostDto;
import fs.socialnetworkapi.dto.post.PostDtoOut;
import fs.socialnetworkapi.entity.Chat;
import fs.socialnetworkapi.entity.Message;
import fs.socialnetworkapi.entity.Post;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.enums.TypePost;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.Set;

@Configuration
public class ModelMapperConfig {
  @Bean
  public ModelMapper modelMapper() {

    ModelMapper modelMapper = new ModelMapper();
    modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

    //User
    modelMapper.createTypeMap(User.class, UserDtoOut.class);

    //Post
    Converter<Set<Post>, Integer> convertSetPostToCountComment = (src) -> src.getSource()
            .stream()
            .filter(post -> post.getTypePost().equals(TypePost.COMMENT))
            .toList()
            .size();
    Converter<Set<Post>, Integer> convertSetPostToCountRepost = (src) -> src.getSource()
            .stream()
            .filter(post -> post.getTypePost().equals(TypePost.REPOST))
            .toList()
            .size();
    Converter<Set<Post>, List<PostDtoOut>> convertSetPostToListComment = (src) -> src.getSource()
            .stream()
            .filter(post -> post.getTypePost().equals(TypePost.COMMENT))
            .map(post -> modelMapper.map(post,PostDtoOut.class))
            .toList();


    modelMapper.createTypeMap(Post.class, PostDtoOut.class)
            .addMappings(mapper -> mapper.using(convertSetPostToCountComment)
                    .map(Post::getReposts, PostDtoOut::setCountComments))
            .addMappings(mapper -> mapper.using(convertSetPostToCountRepost)
                    .map(Post::getReposts, PostDtoOut::setCountRepost))
            .addMappings(mapper -> mapper.using(convertSetPostToListComment)
                    .map(Post::getReposts, PostDtoOut::setComments))
    ;

    modelMapper.createTypeMap(Post.class, OriginalPostDto.class);

    //Message
    Converter<Chat, Long> convertChatToChatId = (src) -> src.getSource().getId();

    modelMapper.createTypeMap(Message.class, MessageDtoOut.class)
            .addMappings(mapper -> mapper.using(convertChatToChatId)
                    .map(Message::getChat, MessageDtoOut::setChatId));

    return modelMapper;
  }

}
