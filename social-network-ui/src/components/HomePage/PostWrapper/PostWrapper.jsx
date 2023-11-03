import React, {useState} from 'react'
// import Post from "../Post/Post";
import Post from '../../Post/post'
import PropTypes from 'prop-types'
import ModalComment from '../../ModalComment/ModalComment';

const PostWrapper = ({ tweets }) => {
	const [commentedPost, setCommentedPost] = useState(null);
    const [openModal, setOpenModal] = useState(false)
	console.log(tweets)
	return (
		<>{tweets && tweets.map(tweet => <Post post={tweet} key={tweet.id} setCommentedPost={setCommentedPost} setOpenModal={setOpenModal} />)}
		{commentedPost ? <ModalComment post={commentedPost} open={openModal} setOpenModal={setOpenModal} /> : null}</>
	)
}

PostWrapper.propTypes = {
	tweets: PropTypes.array,
}

PostWrapper.defaultProps = {
	tweets: [],
}

export default PostWrapper
