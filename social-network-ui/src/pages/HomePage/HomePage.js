import React, { useState, useEffect } from "react";
import getApiPosts from "../../api/getApiPosts";
import TwitterWriteWindow from "../../components/HomePage/TwitterWriteWindow/TwitterWriteWindow";
import PostWrapper from "../../components/HomePage/PostWrapper/PostWrapper";
import UseUserToken from "../../hooks/useUserToken";
import { Box } from "@mui/material";

const Home = () => {
  const [tweetPosts, setTweetPost] = useState([]);
  const { token } = UseUserToken();

  useEffect(() => {
    getApiPosts(token).then((newTweets) => {
      setTweetPost(newTweets);
    });
  }, []);

  const userPhoto = tweetPosts.length > 0 ? tweetPosts[0]?.user?.avatar : "";
  const firstName = tweetPosts.length > 0 ? tweetPosts[0]?.user?.firstName : "";
  const lastName = tweetPosts.length > 0 ? tweetPosts[0]?.user?.lastName : "";

  return (
    <Box>
      <TwitterWriteWindow
        setTweetPost={setTweetPost}
        tweetPosts={tweetPosts}
        userPhoto={userPhoto}
        firstName={firstName}
        lastName={lastName}
        token={token}
      />
      <PostWrapper tweets={tweetPosts} />
    </Box>
  );
};

export default Home;
