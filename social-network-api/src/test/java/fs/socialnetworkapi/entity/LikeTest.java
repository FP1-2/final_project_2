package fs.socialnetworkapi.entity;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;

class LikeTest {

  @Test
  void testGetUser() {
    User user = mock(User.class);
    Like like = new Like();
    like.setUser(user);
    assertEquals(user, like.getUser());
  }

  @Test
  void testGetPost() {
    Post post = mock(Post.class);
    Like like = new Like();
    like.setPost(post);
    assertEquals(post, like.getPost());
  }

  @Test
  void testConstructor() {
    User user = mock(User.class);
    Post post = mock(Post.class);
    Like like = new Like(user, post);
    assertNotNull(like);
    assertEquals(user, like.getUser());
    assertEquals(post, like.getPost());
  }
}
