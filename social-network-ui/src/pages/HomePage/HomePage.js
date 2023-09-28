import React from "react";
// import Header from "../../components/Header/header";
import Post from "../../components/HomePage/Post/Post";
import TwitterWriteWindow from "../../components/HomePage/TwitterWriteWindow/TwitterWriteWindow";

const Home = () => {
  return (
    <div>
      {/* <Header pageName="Main" /> */}
      <section>
        <TwitterWriteWindow />
        <Post />
      </section>
    </div>
  );
};

export default Home;
