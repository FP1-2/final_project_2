import React, { useState, useEffect } from "react";
// import Header from "../../components/Header/header";
import TwitterWriteWindow from "../../components/HomePage/TwitterWriteWindow/TwitterWriteWindow";
import axios from "axios";
import PostWrapper from "../../components/PostWrapper/PostWrapper";

const Home = () => {
  const [tweetPosts, setTweetPost] = useState("");
  const getTweets = async () => {
    const urlGETposts =
      "http://twitterdanit.us-east-1.elasticbeanstalk.com/api/v1/user/3/posts?page=0&size=10";
    try {
      const response = await axios.get(urlGETposts);
      let newTweets = response.data;
      console.log(newTweets);
      setTweetPost(newTweets);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getTweets();
    console.log(tweetPosts);
  }, []);

  return (
    <div>
      {/* <Header pageName="Main" /> */}
      <section>
        <TwitterWriteWindow />
        <PostWrapper tweets={tweetPosts} />
      </section>
    </div>
  );
};

export default Home;
