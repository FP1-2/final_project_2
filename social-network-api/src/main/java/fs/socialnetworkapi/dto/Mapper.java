package fs.socialnetworkapi.dto;

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
  }

  public UserDtoOut map(User user) {
    return this.modelMapper.map(user, UserDtoOut.class);
  }

  public User map(UserDtoIn userDtoIn) {
    return this.modelMapper.map(userDtoIn, User.class);
  }

}