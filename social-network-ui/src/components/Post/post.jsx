import React, { useState, useEffect } from 'react'
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
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Link from '@mui/material/Link';

function Post({ post }) {
  const userId = 777
  const [isLiked, setIsLiked] = useState(post.likes.includes(userId));
  const [likes, setLikes] = useState(post.likes.length || false)
  const [isReposted, setIsReposted] = useState(post.isReposted || false)
  const [reposts, setReposts] = useState(post.usersReposts || false)

  function toggleLiked() {
    isLiked ? setLikes(likes - 1) : setLikes(likes + 1)
    setIsLiked(!isLiked)
  }

  function toggleRepost() {
    isReposted ? setReposts(reposts - 1) : setReposts(reposts + 1)
    setIsReposted (!isReposted)
  }

  return (
    <Card variant="outlined">
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Link href={'/user' + post.user.id} sx={{ display: 'flex', gap: 1, color: 'rgba(0, 0, 0, 0.87)'}} underline='hover'>
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
            src={post.user.avatar}
            sx={{ p: 0.5, border: '2px solid', borderColor: 'background.body' }}
            />
        </Box>
        <Typography variant='h5'>{post.user?.firstName} {post.user?.lastName}</Typography>
        <Typography sx={{display: 'flex', alignItems: 'center'}}>@{post.user.username}</Typography>
        </Link>
        <Link href={'/post' + post.id} color='rgba(0, 0, 0, 0.87)' underline='hover'>
          <Typography>{post.timeWhenWasPost}</Typography>
        </Link>
      </CardContent>
      <CardContent>
        <Typography paragraph={true}>{post.description}</Typography>
        <ImageList>
          <ImageListItem><img src={post.photo}></img></ImageListItem>
        </ImageList>
        <CardActions>
        <Button><MapsUgcRoundedIcon sx={{ color: 'grey' }}/></Button>
          <Button onClick={() => toggleRepost()}>
            <AutorenewRoundedIcon sx={{ color: isReposted ? 'green' : 'grey' }} />
            <Typography sx={{ color: isReposted ? 'green' : 'grey', ml: 1}}>{reposts || null}</Typography>
          </Button>
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
  post: PropTypes.object,
  children: PropTypes.string
}
export default Post

