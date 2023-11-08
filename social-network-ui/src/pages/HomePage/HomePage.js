import React, { useState, useEffect } from 'react';
import getApiPosts from '../../api/getApiPosts';
import TwitterWriteWindow from '../../components/HomePage/TwitterWriteWindow/TwitterWriteWindow';
import PostWrapper from '../../components/HomePage/PostWrapper/PostWrapper';
import UseUserToken from '../../hooks/useUserToken';
import getUserId from '../../utils/getUserId';

const Home = () => {
  const [tweetPosts, setTweetPost] = useState([]);
  const { token } = UseUserToken();
  const userId = getUserId();

  useEffect(() => {
    getApiPosts(token, userId).then((newTweets) => {
      setTweetPost(newTweets);
      console.log(newTweets);
    });
  }, []);

  const userPhoto = tweetPosts.length > 0 ? tweetPosts[0]?.user?.avatar : '';
  const firstName = tweetPosts.length > 0 ? tweetPosts[0]?.user?.firstName : '';
  const lastName = tweetPosts.length > 0 ? tweetPosts[0]?.user?.lastName : '';

  return (
    <section>
      <TwitterWriteWindow
        setTweetPost={setTweetPost}
        tweetPosts={tweetPosts}
        userPhoto={userPhoto}
        firstName={firstName}
        lastName={lastName}
        token={token}
      />
      <PostWrapper tweets={tweetPosts} />
    </section>
  );
};

export default Home;
