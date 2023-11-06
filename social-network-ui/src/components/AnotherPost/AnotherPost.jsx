import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MapsUgcRoundedIcon from '@mui/icons-material/MapsUgcRounded'
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import ImageListItem from '@mui/material/ImageListItem'
import { Link } from 'react-router-dom'
import axios from 'axios'
import UseUserToken from '../../hooks/useUserToken'
import formatPostDate from '../../utils/formatPostDate'
import styles from './AnotherPost.module.scss'
import ModalComment from '../ModalComment/ModalComment'

function AnotherPost ({ post }) {
  const [isLiked, setIsLiked] = useState(post?.hasMyLike)
  const [likes, setLikes] = useState(post?.countLikes)
  const [isReposted, setIsReposted] = useState(post.hasMyRepost)
  const [reposts, setReposts] = useState(post.countRepost)
  const [comments, setComments] = useState(post.countComments)
  const [error, setError] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const { token } = UseUserToken()
  const url = process.env.REACT_APP_SERVER_URL
  const postDate = formatPostDate(post.createdDate)

  function comment() {
    setOpenModal(true)
  }

  async function like () {
    try {
      const response = await axios.post(
        url + `/api/v1/likes/like/${post.id}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
      response.status === 200
        ? toggleLiked()
        : setError(`Error ${response.status}: ${response.error}`)
    } catch (err) {
      setError(`Error: ${err}`)
    }
  }

  async function repost() {
    try {
      const response = await axios.post(
        url + `/api/v1/post/${post.id}/repost`,
        {
          id: 0,
          userId: 0,
          photo: '',
          description: ''
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
      response.status === 200
        ? toggleRepost()
        : setError(`Error ${response.status}: ${response.error}`)
    } catch (err) {
      setError(`Error: ${err}`)
    }
  }

  function toggleLiked () {
    isLiked ? setLikes(likes - 1) : setLikes(likes + 1)
    setIsLiked(!isLiked)
  }

  function toggleRepost () {
    isReposted ? setReposts(reposts - 1) : setReposts(reposts + 1)
    setIsReposted(!isReposted)
  }

  return (<>
    <Card variant='outlined'>
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Link to={'/user/' + post.user.id}>
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
                borderRadius: '50%'
                // background:
                //   'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
              }
            }}
          >
            {post.user.avatar ? (
              <Avatar
                alt={`${post.user.firstName} ${post.user.lastName}`}
                src={post.user.avatar}
                sx={{ width: 50, height: 50, alignSelf: 'flex-start' }}
              />
            ) : (
              <Avatar sx={{ width: 50, height: 50, alignSelf: 'flex-start' }}>
                {post.user.firstName.charAt(0)}
                {post.user.lastName.charAt(0)}
              </Avatar>
            )}
          </Box>
        </Link>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
            alignItems: 'center'
          }}
        >
          <Link to={'/profile/' + post.user.id} className={styles.link}>
            <Typography
              variant='h6'
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {post.user.firstName} {post.user.lastName}
            </Typography>
          </Link>
          <Link to={'/profile/' + post.user.id} className={styles.link}>
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              @{post.user.username}
            </Typography>
          </Link>
          <Typography>
            ●{' '}
            <Link to={'/post/' + post.id} className={styles.link}>
              {postDate}
            </Link>
          </Typography>
        </Box>
      </CardContent>
      <CardContent sx={{pt: 0, pb: '16px'}} className={styles.cardContent}>
        <Link to={'/post/' + post.id} className={styles.postLink}>
          <Typography paragraph={true} sx={{ wordWrap: 'break-word' }}>
            {post.description}
          </Typography>
        <ImageListItem>
          <img src={post.photo}></img>
          </ImageListItem>
          </Link>
        <CardActions>
          <Button onClick={() => comment()}>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <MapsUgcRoundedIcon sx={{ color: 'grey' }} />
            <Typography sx={{ color: 'grey', ml: 1 }}>
              {comments || null}
              </Typography>
            </Box>
          </Button>
          <Button onClick={() => repost()}>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <AutorenewRoundedIcon
              sx={{ color: isReposted ? 'green' : 'grey' }}
            />
            <Typography sx={{ color: isReposted ? 'green' : 'grey', ml: 1 }}>
              {reposts || null}
              </Typography>
              </Box>
          </Button>
          <Button onClick={() => like()}>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
            {isLiked ? (
              <FavoriteIcon sx={{ color: 'red' }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: 'grey' }} />
            )}
            <Typography sx={{ color: isLiked ? 'red' : 'grey', ml: 1 }}>
              {likes || null}
              </Typography>
              </Box>
          </Button>
        </CardActions>
        <Typography sx={{ color: 'red' }}> {error}</Typography>
      </CardContent>
    </Card>
    <ModalComment
            post={post}
            commentsCount={comments}
            open={openModal}
            setOpenModal={setOpenModal}
            setCommentsCount={setComments}
          />
    </>
  )
}

AnotherPost.propTypes = {
  post: PropTypes.object,
  children: PropTypes.string,
  setCommentedPost: PropTypes.func,
  setOpenModal: PropTypes.func,
  commentsCount: PropTypes.array,
  setCommentsCount: PropTypes.func
}
export default AnotherPost
