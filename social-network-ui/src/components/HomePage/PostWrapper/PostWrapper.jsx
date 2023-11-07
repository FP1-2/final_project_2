import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ModalComment from '../../ModalComment/ModalComment'
import AnotherPost from '../../AnotherPost/AnotherPost'

const PostWrapper = ({ tweets }) => {
	const [commentedPost, setCommentedPost] = useState(null)
	const [openModal, setOpenModal] = useState(false)
	console.log(tweets)
	return (
		<>{tweets && tweets.map(tweet => <AnotherPost post={tweet} key={tweet.id} />)}</>
	)
}

PostWrapper.propTypes = {
	tweets: PropTypes.array,
}

PostWrapper.defaultProps = {
	tweets: [],
}

export default PostWrapper
