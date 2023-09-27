import React, { useState } from 'react'
import styles from './post.module.scss'
import { PropTypes } from 'prop-types'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button'

function Post({ post }) {
  const [liked, setLiked] = useState(true);

  function toggleLiked() {
    setLiked(!liked)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.postInfo}>
        <p>{post.userName}</p>
      </div>
      <p>{post.content}</p>
      <Button onClick={() => toggleLiked()}>
        {liked ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon />}
        </Button>
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.object
}
export default Post
