package fs.socialnetworkapi.service;

import fs.socialnetworkapi.dto.user.UserDtoOut;
import fs.socialnetworkapi.dto.post.PostDtoIn;
import fs.socialnetworkapi.dto.post.PostDtoOut;
import fs.socialnetworkapi.entity.Like;
import fs.socialnetworkapi.entity.Post;
import fs.socialnetworkapi.entity.User;
import fs.socialnetworkapi.exception.PostNotFoundException;
import fs.socialnetworkapi.repos.PostRepo;
import fs.socialnetworkapi.repos.UserRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PostServiceTest {

    @Mock
    private PostRepo postRepo;

    @Mock
    private UserRepo userRepo;

    @Mock
    private ModelMapper mapper;

    @Mock
    private UserService userService;

    @Mock
    private LikeService likeService;

    @InjectMocks
    private PostService postService;

    private User user1;
    private User user2;
    private UserDtoOut userDtoOut1;
    private UserDtoOut userDtoOut2;
    private Post post;
    private Post post2;
    private PostDtoOut postDtoOut1;
    private PostDtoOut postDtoOut2;
    private Like like1;
    private Like like2;


    @BeforeEach
    public void setUp() {

        user1 = new User();
        user1.setId(1L);

        user2 = new User();
        user2.setId(2L);

        userDtoOut1 = new UserDtoOut();
        userDtoOut1.setId(1L);

        userDtoOut2 = new UserDtoOut();
        userDtoOut2.setId(2L);

        post = new Post();
        post.setDescription("Description");
        post.setPhoto("Photo");
        post.setUser(user1);

        post2 = new Post();
        post2.setDescription("Description");
        post2.setPhoto("Photo");
        Set<User> usersRepost = new HashSet<>();
        usersRepost.add(user2);
        //post2.setUsersReposts(usersRepost);
        post2.setUser(user1);

        postDtoOut1 = PostDtoOut.builder()
                .id(1L)
                .user(userDtoOut1)
                .description("Description")
                .photo("Photo")
                .createdDate(LocalDateTime.now())
                //.likes(List.of())
                .build();

        postDtoOut2 = PostDtoOut.builder()
                .id(2L)
                .user(userDtoOut2)
                .description("Description")
                .photo("Photo")
                .createdDate(LocalDateTime.now())
                //.likes(List.of())
                .build();

        like1 = new Like(user1, post);
        like2 = new Like(user1, post2);

    }

    @Test
    public void testSave_whenUserNotFound(){
    //        Mockito.when(userRepo.findById(any())).thenReturn(Optional.empty());
    //
    //        assertThrows(UserNotFoundException.class, () -> postService.savePost( any(PostDtoIn.class)));
    }
//    @Test
//    public void testSave() {
//
//        PostDtoIn postDtoIn = PostDtoIn.builder()
//                .description("Description")
//                .photo("Photo")
//                .build();
//
//        PostDtoOut expectedPostDtoOut = PostDtoOut.builder()
//                .id(1L)
//                .user(userDtoOut1)
//                .description("Description")
//                .photo("Photo")
//                .build();
//
//        SecurityContext securityContext = mock(SecurityContext.class);
//        SecurityContextHolder.setContext(securityContext);
//
//        Authentication authentication = mock(Authentication.class);
//        when(securityContext.getAuthentication()).thenReturn(authentication);
//
//        when(authentication.getPrincipal()).thenReturn(user1);
//
//        //Mockito.when(userRepo.findById(1L)).thenReturn(Optional.of(user1));
//        when(SecurityContextHolder.getContext().getAuthentication().getPrincipal()).thenReturn(user1);
//        when(mapper.map(postDtoIn,Post.class)).thenReturn(post);
//        when(postRepo.save(post)).thenReturn(post);
//        when(mapper.map(eq(post), eq(PostDtoOut.class))).thenReturn(expectedPostDtoOut);
//        when(postService.s)
//
//        PostDtoOut result = postService.savePost(postDtoIn);
//
//        assertNotNull(result);
//        assertEquals(expectedPostDtoOut, result);
//    }

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

        UserDtoOut userDtoOut1 = new UserDtoOut();
        userDtoOut1.setId(1L);

        PostDtoOut expectedPostDtoOut = PostDtoOut.builder()
                .id(1L)
                .user(userDtoOut1)
                .description("Description")
                .photo("Photo")
                .build();

        when(postRepo.findById(postDtoIn.getId())).thenReturn(Optional.of(post));
        when(postRepo.save(eq(post))).thenReturn(post);
        when(mapper.map(eq(post), eq(PostDtoOut.class))).thenReturn(expectedPostDtoOut);

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

        when(postRepo.findById(postDtoIn.getId())).thenReturn(Optional.empty());

        assertThrows(PostNotFoundException.class, () -> postService.editePost(postDtoIn));
    }

    @Test
    public void testGetAllPosts_whenUserNotFound(){
//        when(userRepo.findById(any())).thenReturn(Optional.empty());
//
//        assertThrows(UserNotFoundException.class, () -> postService.savePost( any(PostDtoIn.class)));
    }
    @Test
    public void testGetProfilePosts() {

        Long userId = 1L;
        Integer page = 0;
        Integer size = 5;

        User user1 = new User();
        user1.setId(userId);
        User user2 = new User();
        user2.setId(4L);

        UserDtoOut user1DtoOut = new UserDtoOut();
        user1DtoOut.setId(userId);
        UserDtoOut subscription1DtoOut = new UserDtoOut();
        subscription1DtoOut.setId(2L);
        UserDtoOut subscription2DtoOut = new UserDtoOut();
        subscription2DtoOut.setId(3L);

        //posts user1
        Post post1 = new Post();
        post1.setId(1L);
        post1.setUser(user1);
        post1.setCreatedDate(LocalDateTime.now().minusMinutes(1));

        Post post2 = new Post();
        post2.setId(2L);
        post2.setUser(user1);
        post1.setCreatedDate(LocalDateTime.now().minusMinutes(2));

        //posts user2
        Post post3 = new Post();
        post3.setId(3L);
        post3.setUser(user2);
        post1.setCreatedDate(LocalDateTime.now().minusMinutes(3));

        Post post4 = new Post();
        post4.setId(4L);
        post4.setUser(user2);
        post1.setCreatedDate(LocalDateTime.now().minusMinutes(4));

        List<Post> posts = List.of(post1, post2);
        Page<Post> pageOfPosts = new PageImpl<>(posts);

        PostDtoOut postDto1 = PostDtoOut.builder().id(1L).user(user1DtoOut).build();
        PostDtoOut postDto2 = PostDtoOut.builder().id(2L).user(user1DtoOut).build();

        List<PostDtoOut> expectedPostDtoOutList = List.of(
                postDto1,
                postDto2);

//        SecurityContext securityContext = mock(SecurityContext.class);
//        SecurityContextHolder.setContext(securityContext);
//
//        Authentication authentication = mock(Authentication.class);
//        when(securityContext.getAuthentication()).thenReturn(authentication);

        //when(authentication.getPrincipal()).thenReturn(user1);

        Mockito.when(postRepo.findByUser(eq(user1), eq(PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdDate"))))).thenReturn(pageOfPosts);

        when(mapper.map(post1, PostDtoOut.class)).thenReturn(postDto1);
        when(mapper.map(post2, PostDtoOut.class)).thenReturn(postDto2);
        when(userService.findById(userId)).thenReturn(user1);
        List<PostDtoOut> result = postService.getProfilePosts(userId, page, size);

        assertEquals(expectedPostDtoOutList, result);
    }

    @Test
    public void testSaveByType(){

//        PostDtoIn postDtoIn = PostDtoIn.builder()
//                .id(1L)
//                .userId(1L)
//                .description("Description")
//                .photo("Photo")
//                .build();
//
//        PostDtoOut expectedPostDtoOut = PostDtoOut.builder()
//                .id(1L)
//                .user(userDtoOut1)
//                .description("Description")
//                .photo("Photo")
//                .build();
//
//        Post post1 = new Post();
//        post1.setId(1L);
//        post1.setUser(user1);
//
//        SecurityContext securityContext = mock(SecurityContext.class);
//        SecurityContextHolder.setContext(securityContext);
//
//        Authentication authentication = mock(Authentication.class);
//        when(securityContext.getAuthentication()).thenReturn(authentication);
//
//        when(authentication.getPrincipal()).thenReturn(user1);
//
//        when(mapper.map(eq(postDtoIn), eq(Post.class))).thenReturn(post);
//        when(postRepo.save(post)).thenReturn(post);
//        when(postRepo.findById(eq(1L))).thenReturn(Optional.of(post1));
//        when(mapper.map(eq(post), eq(PostDtoOut.class))).thenReturn(expectedPostDtoOut);
//
//
//        PostDtoOut result = postService.saveByType(1L, postDtoIn, TypePost.REPOST);
//
//        Mockito.verify(postRepo,times(1)).findById(any());
//
//        assertNotNull(result);
//        assertEquals(expectedPostDtoOut, result);
    }

    @Test
    void testFindById() {
        when(postRepo.findById(1L)).thenReturn(Optional.of(post));
        when(mapper.map(post, PostDtoOut.class)).thenReturn(postDtoOut1);

        PostDtoOut result = postService.findById(1L);

        assertNotNull(result);
        assertEquals("Description", result.getDescription());
        assertEquals("Photo", result.getPhoto());
        assertEquals(userDtoOut1, result.getUser());

        Mockito.verify(postRepo, times(1)).findById(1L);
    }


//    @Test
//    void testFindLikedPostsByUserId() {
//        List<Like> likes = List.of(like1, like2);
//        when(likeService.getLikesForUser()).thenReturn(likes);
//        when(mapper.map(Mockito.any(Post.class), eq(PostDtoOut.class))).thenReturn(postDtoOut1, postDtoOut2);
//
//        List<PostDtoOut> results = postService.findLikedPostsByUserId(1L);
//
//        assertNotNull(results);
//        assertEquals(2, results.size());
//        assertEquals("Description", results.get(0).getDescription());
//        assertEquals("Photo", results.get(0).getPhoto());
//        assertEquals(userDtoOut1, results.get(0).getUser());
//        assertEquals("Description", results.get(1).getDescription());
//        assertEquals("Photo", results.get(1).getPhoto());
//        assertEquals(userDtoOut2, results.get(1).getUser());
//
//        Mockito.verify(likeService, times(1)).getLikesForUser(1L);
//    }

}
