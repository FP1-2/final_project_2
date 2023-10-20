import React, { useState } from 'react'
import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import PostsTypeVariant from './PostsTypeVariant/PostsTypeVariant'

const postTypesArray = ['Tweets', 'Tweets & replies', 'Media', 'Likes']

const PostsTypeToogle = () => {
	const [isChosen, setisChosen] = useState(0)
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
			}}
		>
			{postTypesArray.map((postType, index) => {
				return (
					<PostsTypeVariant
						isChosen={isChosen === index ? true : false}
						text={postType}
						key={postType}
						index={index}
						setisChosen={setisChosen}
					/>
				)
			})}
		</Box>
	)
}

export default PostsTypeToogle
