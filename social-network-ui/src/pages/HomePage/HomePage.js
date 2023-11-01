import React, { useState, useEffect } from "react";
import getApiPosts from "../../api/getApiPosts";
import Header from "../../components/Header/header";
import TwitterWriteWindow from "../../components/HomePage/TwitterWriteWindow/TwitterWriteWindow";
import PostWrapper from "../../components/HomePage/PostWrapper/PostWrapper";
import UseUserToken from "../../hooks/useUserToken";
import useUserId from "../../hooks/useUserId";

const Home = () => {
  const [tweetPosts, setTweetPost] = useState([]);
  const { token } = UseUserToken();
  const userId = useUserId();

  useEffect(() => {
    getApiPosts(token, userId).then((newTweets) => {
      setTweetPost(newTweets);
      // console.log(newTweets);
      // console.log(token);
    });
  }, []);

  // const userPhoto = tweetPosts.length > 0 ? tweetPosts[0]?.user?.avatar : "";
  // const firstName = tweetPosts.length > 0 ? tweetPosts[0]?.user?.firstName : "";
  // const lastName = tweetPosts.length > 0 ? tweetPosts[0]?.user?.lastName : "";

  return (
    <Header pageName="Home">
      <section>
        <TwitterWriteWindow
          setTweetPost={setTweetPost}
          tweetPosts={tweetPosts}
          // userPhoto={userPhoto}
          // firstName={firstName}
          // lastName={lastName}
          token={token}
        />
        <PostWrapper tweets={tweetPosts} />
      </section>
    </Header>
  );
};

export default Home;
