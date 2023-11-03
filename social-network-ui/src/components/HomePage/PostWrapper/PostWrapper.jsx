import React from 'react'
// import Post from "../Post/Post";
import Post from '../../Post/post'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'

const PostWrapper = ({ tweets }) => {

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
			{tweets && tweets.map(tweet => <Post post={tweet} key={tweet.id} />)}
		</Box>
	)
}

PostWrapper.propTypes = {
	tweets: PropTypes.array,
}

PostWrapper.defaultProps = {
	tweets: [],
}

export default PostWrapper
