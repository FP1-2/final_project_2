package fs.socialnetworkapi.dto;

import fs.socialnetworkapi.dto.post.PostDtoIn;
import fs.socialnetworkapi.dto.post.PostDtoOut;
import fs.socialnetworkapi.dto.user.UserDtoIn;
import fs.socialnetworkapi.dto.user.UserDtoOut;
import fs.socialnetworkapi.entity.Post;
import fs.socialnetworkapi.entity.User;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Component;

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
    this.modelMapper.createTypeMap(Post.class, PostDtoOut.class)
            .addMappings(mapper -> mapper.map(src -> src.getUser().getId(), PostDtoOut::setUserId));
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