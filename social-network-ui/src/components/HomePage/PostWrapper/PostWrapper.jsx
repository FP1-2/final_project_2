import React from 'react'
// import Post from "../Post/Post";
import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import AnotherPost from '../../AnotherPost/AnotherPost'

const PostWrapper = ({ tweets }) => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
			{tweets &&
				tweets.map(tweet => <AnotherPost post={tweet} key={tweet.id} />)}
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
