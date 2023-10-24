import React from "react";
import Post from "../Post/Post";
import PropTypes from "prop-types";

const PostWrapper = ({ tweets }) => {
  console.log(tweets);
  return (
    <>{tweets && tweets.map((tweet, id) => <Post tweet={tweet} key={id} />)}</>
  );
};

PostWrapper.propTypes = {
  tweets: PropTypes.array,
};

PostWrapper.defaultProps = {
  tweets: [],
};

export default PostWrapper;
