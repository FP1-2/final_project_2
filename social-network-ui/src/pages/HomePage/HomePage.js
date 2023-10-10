import React, { useState, useEffect } from "react";
import getApiPosts from "../../api/getApiPosts";
// import Header from "../../components/Header/header";
import TwitterWriteWindow from "../../components/HomePage/TwitterWriteWindow/TwitterWriteWindow";
import axios from "axios";
import PostWrapper from "../../components/PostWrapper/PostWrapper";

const Home = () => {
  const [tweetPosts, setTweetPost] = useState([]);

  useEffect(() => {
    getApiPosts().then((newTweets) => {
      setTweetPost(newTweets);
      console.log(newTweets);
    });
  }, []);

  return (
    <div>
      {/* <Header pageName="Main" /> */}
      <section>
        <TwitterWriteWindow
          setTweetPost={setTweetPost}
          tweetPosts={tweetPosts}
          userPhoto={tweetPosts.length > 0 ? tweetPosts[0].user.avatar : ""}
          firstName={tweetPosts.length > 0 ? tweetPosts[0].user.firstName : ""}
          lastName={tweetPosts.length > 0 ? tweetPosts[0].user.lastName : ""}
        />
        <PostWrapper tweets={tweetPosts} />
      </section>
    </div>
  );
};

export default Home;
