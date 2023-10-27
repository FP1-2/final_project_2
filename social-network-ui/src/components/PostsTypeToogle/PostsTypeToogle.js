import React, { useState } from 'react'
import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import PostsTypeVariant from './PostsTypeVariant/PostsTypeVariant'
import { useEffect } from 'react'

const postTypesArray = ['Tweets', 'Tweets & replies', 'Likes']

const PostsTypeToogle = ({ setChoosenTypePost }) => {
	const [isChosen, setisChosen] = useState(0)

	useEffect(() => {
		setChoosenTypePost(isChosen)
	}, [isChosen])
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
PostsTypeToogle.propTypes = {
	setChoosenTypePost: PropTypes.func.isRequired,
}

export default PostsTypeToogle
