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
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
public class PostServiceTest {

    @Mock
    private PostRepo postRepo;

    @Mock
    private UserRepo userRepo;

    @Mock
    private Mapper mapper;

    @InjectMocks
    private PostService postService;

    @Test
    public void testSave_whenUserNotFound(){
        Mockito.when(userRepo.findById(any())).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> postService.save(1L, any(PostDtoIn.class)));
    }
    @Test
    public void testSave() {

        Long idUser = 1L;
        PostDtoIn postDtoIn = PostDtoIn.builder()
                .description("Description")
                .photo("Photo")
                .build();

        User user = new User();
        user.setId(idUser);

        Post post = new Post();
        post.setDescription("Description");
        post.setPhoto("Photo");
        post.setUser(user);

        PostDtoOut expectedPostDtoOut = PostDtoOut.builder()
                .id(1L)
                .userId(1L)
                .description("Description")
                .photo("Photo")
                .build();

        Mockito.when(userRepo.findById(1L)).thenReturn(Optional.of(user));
        Mockito.when(mapper.map(postDtoIn)).thenReturn(post);
        Mockito.when(postRepo.save(post)).thenReturn(post);
        Mockito.when(mapper.map(post)).thenReturn(expectedPostDtoOut);

        PostDtoOut result = postService.save(idUser, postDtoIn);

        Mockito.verify(userRepo,times(1)).findById(any());

        assertNotNull(result);
        assertEquals(expectedPostDtoOut, result);
    }

    @Test
    public void testEditePost(){
        PostDtoIn postDtoIn = PostDtoIn.builder()
                .id(1L)
                .userId(1L)
                .description("Description")
                .photo("Photo")
                .build();

        User user = new User();
        user.setId(postDtoIn.getUserId());

        Post post = new Post();
        post.setId(1L);
        post.setDescription("Description");
        post.setPhoto("Photo");
        post.setUser(user);

        PostDtoOut expectedPostDtoOut = PostDtoOut.builder()
                .id(1L)
                .userId(1L)
                .description("Description")
                .photo("Photo")
                .build();

        Mockito.when(postRepo.getReferenceById(postDtoIn.getId())).thenReturn(post);
        Mockito.when(postRepo.save(post)).thenReturn(post);
        Mockito.when(mapper.map(post)).thenReturn(expectedPostDtoOut);

        PostDtoOut result = postService.editePost(postDtoIn);
        assertNotNull(result);
        assertEquals(expectedPostDtoOut, result);
    }
    @Test
    public void testEditePostWhenPostNotFound() throws PostNotFoundException{
        PostDtoIn postDtoIn = PostDtoIn.builder()
                .id(1L)
                .userId(1L)
                .description("Description")
                .photo("Photo")
                .build();

        Mockito.when(postRepo.getReferenceById(postDtoIn.getId())).thenThrow(new EntityNotFoundException());

        assertThrows(PostNotFoundException.class, () -> postService.editePost(postDtoIn));
    }

    @Test
    public void testGetAllPosts_whenUserNotFound(){
        Mockito.when(userRepo.findById(any())).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> postService.save(1L, any(PostDtoIn.class)));
    }
    @Test
    public void testGetAllPosts() {

        Long idUser = 1L;
        Integer page = 0;
        Integer size = 5;

        User user1 = new User();
        user1.setId(idUser);
        User user2 = new User();
        user2.setId(4L);

        User subscription1 = new User();
        subscription1.setId(2L);
        User subscription2 = new User();
        subscription2.setId(3L);

        Set<User> followings = user1.getFollowings();
        followings.add(subscription1);
        followings.add(subscription2);
        //posts user1
        Post post1 = new Post();
        post1.setId(1L);
        post1.setUser(user1);

        Post post2 = new Post();
        post2.setId(2L);
        post2.setUser(user1);

        //posts user2
        Post post3 = new Post();
        post3.setId(3L);
        post3.setUser(user2);

        Post post4 = new Post();
        post4.setId(4L);
        post4.setUser(user2);

        //posts subscription1
        Post post5 = new Post();
        post5.setId(5L);
        post5.setUser(subscription1);

        Post post6 = new Post();
        post6.setId(6L);
        post6.setUser(subscription1);

        //posts subscription2
        Post post7 = new Post();
        post7.setId(7L);
        post7.setUser(subscription2);

        Post post8 = new Post();
        post8.setId(8L);
        post8.setUser(subscription2);

        List<Post> posts = List.of(post1, post2, post5, post6, post7);
        Page<Post> pageOfPosts = new PageImpl<>(posts);

        PostDtoOut postDto1 = PostDtoOut.builder().id(1L).userId(user1.getId()).build();
        PostDtoOut postDto2 = PostDtoOut.builder().id(2L).userId(user1.getId()).build();
        PostDtoOut postDto3 = PostDtoOut.builder().id(3L).userId(user2.getId()).build();
        PostDtoOut postDto4 = PostDtoOut.builder().id(4L).userId(user2.getId()).build();
        PostDtoOut postDto5 = PostDtoOut.builder().id(5L).userId(subscription1.getId()).build();
        PostDtoOut postDto6 = PostDtoOut.builder().id(6L).userId(subscription1.getId()).build();
        PostDtoOut postDto7 = PostDtoOut.builder().id(7L).userId(subscription2.getId()).build();
        PostDtoOut postDto8 = PostDtoOut.builder().id(8L).userId(subscription2.getId()).build();

        List<PostDtoOut> expectedPostDtoOutList = List.of(
                postDto1,
                postDto2,
                postDto5,
                postDto6,
                postDto7);

        List<User> users = List.of(user1,subscription1, subscription2);
        Mockito.when(userRepo.findById(idUser)).thenReturn(Optional.of(user1));
        Mockito.when(postRepo.findByUserIn(eq(users), eq(PageRequest.of(page, size)))).thenReturn(pageOfPosts);

        Mockito.when(mapper.map(post1)).thenReturn(postDto1);
        Mockito.when(mapper.map(post2)).thenReturn(postDto2);
//        Mockito.when(mapper.map(post3)).thenReturn(postDto3);
//        Mockito.when(mapper.map(post4)).thenReturn(postDto4);
        Mockito.when(mapper.map(post5)).thenReturn(postDto5);
        Mockito.when(mapper.map(post6)).thenReturn(postDto6);
        Mockito.when(mapper.map(post7)).thenReturn(postDto7);
        Mockito.when(mapper.map(post8)).thenReturn(postDto8);

        List<PostDtoOut> result = postService.getAllPosts(idUser, page, size);

        assertEquals(expectedPostDtoOutList, result);
    }

    @Test
    public void testDeletePost() {

        Long idPost = 1L;
        PostService postService1 = new PostService(postRepo,userRepo,mapper);
        postService1.deletePost(idPost);
        Mockito.verify(postRepo).deleteById(idPost);

    }
}
