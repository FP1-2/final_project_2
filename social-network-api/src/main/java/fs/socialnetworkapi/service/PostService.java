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
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

  private final PostRepo postRepo;
  private final UserRepo userRepo;
  private final Mapper mapper;

  public List<PostDtoOut> getAllPosts(Long idUser, Integer page, Integer size) {

    User user = new User();
    user.setId(idUser);
    return postRepo.findByUser(user, PageRequest.of(page, size))
            .stream()
            .map(mapper::map)
            .toList();
  }


  public PostDtoOut save(Long idUser, PostDtoIn postDtoIn) {
    Post post = mapper.map(postDtoIn);
    User user = new User();
    user.setId(idUser);

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
}
