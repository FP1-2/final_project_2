import React from 'react'
import PropTypes from 'prop-types'
import AnotherPost from '../../AnotherPost/AnotherPost'
import { Box } from '@mui/material'

const PostWrapper = ({ tweets }) => {
	console.log(tweets)

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 3.5,
			}}
		>
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
