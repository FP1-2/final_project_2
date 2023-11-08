import React from 'react';
import PropTypes from 'prop-types';
import AnotherPost from '../../AnotherPost/AnotherPost';

const PostWrapper = ({ tweets }) => {
  console.log(tweets);

  return (
    <>
      {tweets &&
        tweets.map((tweet) => <AnotherPost post={tweet} key={tweet.id} />)}
    </>
  );
};

PostWrapper.propTypes = {
  tweets: PropTypes.array,
};

PostWrapper.defaultProps = {
  tweets: [],
};

export default PostWrapper;
