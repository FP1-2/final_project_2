package fs.socialnetworkapi.service;

import fs.socialnetworkapi.dto.Mapper;
import fs.socialnetworkapi.dto.post.PostDtoIn;
import fs.socialnetworkapi.dto.post.PostDtoOut;
import fs.socialnetworkapi.entity.Post;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.exception.PostNotFoundException;
import fs.socialnetworkapi.exception.UserNotFoundException;
import fs.socialnetworkapi.repos.PostRepo;
import fs.socialnetworkapi.repos.UserRepo;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PostService {

  private final PostRepo postRepo;
  private final UserRepo userRepo;
  private final Mapper mapper;

  public List<PostDtoOut> getAllPosts(Long idUser, Integer page, Integer size) {

    User user = userRepo.findById(idUser)
            .orElseThrow(() -> new UserNotFoundException(String.format("User with id: %d not found", idUser)));

    Set<User> followings = user.getFollowings();
    followings.add(user);
    List<User> users = followings.stream().sorted((user1, user2) -> (int) (user1.getId() - user2.getId())).toList();

    List<Long> idList = user.getReposts().stream().map(Post::getId).toList();
    PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdDate"));
    return postRepo.findByUserInOrIdIn(users, idList, pageRequest)
            .stream()
            .map(mapper::map)
            .peek(postDtoOut -> {
              if (!postDtoOut.getUser().getId().equals(idUser)) {
                postDtoOut.setIsRepost(true);
                postDtoOut.setUsersReposts(List.of());
              }
            })
            .toList();
  }

  public List<PostDtoOut> getFollowingsPosts(Long idUser, Integer page, Integer size) {

    User user = userRepo.findById(idUser)
            .orElseThrow(() -> new UserNotFoundException(String.format("User with id: %d not found", idUser)));

    Set<User> followings = user.getFollowings();
    List<User> users = followings.stream().sorted((user1, user2) -> (int) (user1.getId() - user2.getId())).toList();

    return postRepo.findByUserIn(users, PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdDate")))
            .stream()
            .map(mapper::map)
            .toList();
  }

  public PostDtoOut save(Long idUser, PostDtoIn postDtoIn) {

    User user = userRepo.findById(idUser)
            .orElseThrow(() -> new UserNotFoundException(String.format("User with id: %d not found", idUser)));

    Post post = mapper.map(postDtoIn);
    post.setUser(user);
    return mapper.map(postRepo.save(post));
  }

  public void deletePost(Long idPost) {

    postRepo.deleteById(idPost);
  }

  public PostDtoOut editePost(PostDtoIn postDtoIn) {

    try {
      Post post = postRepo.getReferenceById(postDtoIn.getId());
      post.setDescription(postDtoIn.getDescription());
      post.setPhoto(postDtoIn.getPhoto());

      return mapper.map(postRepo.save(post));
    } catch (EntityNotFoundException ex) {
      throw new PostNotFoundException("Post is not found with id:" + postDtoIn.getId());
    }
  }

  public PostDtoOut saveRepost(Long idUser, Long idPost) {
    User user = userRepo.findById(idUser)
            .orElseThrow(() -> new UserNotFoundException(String.format("User with id: %d not found", idUser)));
    Post post = postRepo.findById(idPost)
            .orElseThrow(() -> new PostNotFoundException(String.format("Post with id: %d not found", idPost)));

    post.getUsersReposts().add(user);

    return mapper.map(postRepo.save(post));
  }
}
