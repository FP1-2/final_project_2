package fs.socialnetworkapi.service;

import fs.socialnetworkapi.dto.Mapper;
import fs.socialnetworkapi.dto.post.PostDtoIn;
import fs.socialnetworkapi.dto.post.PostDtoOut;
import fs.socialnetworkapi.entity.Post;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.repos.PostRepo;
import fs.socialnetworkapi.repos.UserRepo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;

@ExtendWith(MockitoExtension.class)
public class PostServiceTest {

    @Mock
    private PostRepo postRepo;

    @Mock
    private UserRepo userRepo;

    @Mock
    private Mapper mapper;

    @Mock
    private Pageable mockPageable;

    @InjectMocks
    private PostService postService;

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

        Mockito.when(mapper.map(postDtoIn)).thenReturn(post);
        Mockito.when(postRepo.save(post)).thenReturn(post);
        Mockito.when(mapper.map(post)).thenReturn(expectedPostDtoOut);

        PostDtoOut result = postService.save(idUser, postDtoIn);

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
    public void testGetAllPosts() {

        Long idUser = 1L;
        Integer page = 0;
        Integer size = 10;

        User user = new User();
        user.setId(idUser);

        List<Post> posts = List.of(new Post(), new Post());
        Page<Post> pageOfPosts = new PageImpl<>(posts);

        List<PostDtoOut> expectedPostDtoOutList = List.of(PostDtoOut.builder().build(), PostDtoOut.builder().build());

        // Макетування поведінки

        Mockito.when(postRepo.findByUser(any(User.class), eq(PageRequest.of(page, size)))).thenReturn(pageOfPosts);
        Mockito.when(mapper.map(posts.get(0))).thenReturn(expectedPostDtoOutList.get(0));
        Mockito.when(mapper.map(posts.get(1))).thenReturn(expectedPostDtoOutList.get(1));

        // Виклик методу getAllPosts
        List<PostDtoOut> result = postService.getAllPosts(idUser, page, size);

        // Перевірка результату
        assertEquals(expectedPostDtoOutList, result);
    }
}
