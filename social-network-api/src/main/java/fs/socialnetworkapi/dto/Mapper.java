package fs.socialnetworkapi.dto;

import fs.socialnetworkapi.dto.post.PostDtoIn;
import fs.socialnetworkapi.dto.post.PostDtoOut;
import fs.socialnetworkapi.entity.Post;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.utils.Universal;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Component
public class Mapper {
  private final ModelMapper modelMapper;

  public Mapper() {
    this.modelMapper = new ModelMapper();
    modelMapper.getConfiguration()
      .setMatchingStrategy(MatchingStrategies.STRICT);
    this.modelMapper
      .createTypeMap(User.class, UserDtoOut.class);

    //Post
    Converter<Set<User>, List<UserDtoOut>> convertSetUserToListUserDtoOut = (src) -> src.getSource().stream()
            .map(this::map)
            .toList();
    Converter<LocalDateTime, String> convertLocalDateTimeToString = (src) -> Universal.convert(src.getSource());

    this.modelMapper.createTypeMap(Post.class, PostDtoOut.class)
            .addMappings(mapper -> mapper.using(convertSetUserToListUserDtoOut)
                    .map(Post::getUsersReposts, PostDtoOut::setUsersReposts))
            .addMappings(mapper -> mapper.using(convertLocalDateTimeToString)
                    .map(Post::getCreatedDate, PostDtoOut::setTimeWhenWasPost));
  }

  public UserDtoOut map(User user) {
    return this.modelMapper.map(user, UserDtoOut.class);
  }

  public User map(UserDtoIn userDtoIn) {
    return this.modelMapper.map(userDtoIn, User.class);
  }

  public PostDtoOut map(Post post) {
    return this.modelMapper.map(post, PostDtoOut.class);
  }

  public Post map(PostDtoIn post) {
    return this.modelMapper.map(post, Post.class);
  }
}