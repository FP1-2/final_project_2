import React from 'react'
// import Post from "../Post/Post";
import Post from '../../Post/post'
import PropTypes from 'prop-types'

const PostWrapper = ({ tweets }) => {
	console.log(tweets)
	return (
		<>{tweets && tweets.map(tweet => <Post post={tweet} key={tweet.id} />)}</>
	)
}

PostWrapper.propTypes = {
	tweets: PropTypes.array,
}

PostWrapper.defaultProps = {
	tweets: [],
}

export default PostWrapper
