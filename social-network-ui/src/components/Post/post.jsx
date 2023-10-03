import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MapsUgcRoundedIcon from '@mui/icons-material/MapsUgcRounded';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';

function Post({ post }) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likes, setLikes] = useState(post.likes || false)

  function toggleLiked() {
    isLiked ? setLikes(likes - 1) : setLikes(likes + 1)
    setIsLiked(!isLiked)
  }

  return (
    <Card variant="outlined">
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              m: '-2px',
              borderRadius: '50%',
              // background:
              //   'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
            },
          }}
        >
          <Avatar
            size="sm"
            src=""
            sx={{ p: 0.5, border: '2px solid', borderColor: 'background.body' }}
          />
        </Box>
        <Typography variant='h5'>{post.userName}</Typography>
        <Typography>@{post.userName}</Typography>
      </CardContent>
      <CardContent>
        <Typography paragraph='true'>{post.content}</Typography>
        <CardActions>
        <Button><MapsUgcRoundedIcon sx={{ color: 'grey' }}/></Button>
        <Button><AutorenewRoundedIcon sx={{ color: 'grey' }}/></Button>
        <Button onClick={() => toggleLiked()}>
            {isLiked ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon sx={{ color: 'grey' }} />}
            <Typography sx={{ color: isLiked? 'red' : 'grey', ml: 1}}>{likes || null}</Typography>
        </Button>
        </CardActions>
        </CardContent>
      
    </Card>
  )
}

Post.propTypes = {
  post: PropTypes.object
}
export default Post

