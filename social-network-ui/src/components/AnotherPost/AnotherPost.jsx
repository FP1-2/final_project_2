import React, { useState, useEffect } from 'react'
import {
  Button,
  Modal,
  Box,
  Avatar,
  Typography,
  Card,
  CardContent,
  CardActions,
  ImageListItem
} from '@mui/material'
import { PropTypes } from 'prop-types'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MapsUgcRoundedIcon from '@mui/icons-material/MapsUgcRounded'
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import { Link } from 'react-router-dom'
import axios from 'axios'
import UseUserToken from '../../hooks/useUserToken'
import formatPostDate from '../../utils/formatPostDate'
import styles from './AnotherPost.module.scss'
import ModalComment from '../ModalComment/ModalComment'
import getUserId from '../../utils/getUserId'
import { useDispatch, useSelector } from 'react-redux'
import { addFollowing, removeFollowing } from '../../redux/slices/userSlice'
import CustomTooltip from '../Custom Tooltip/CustomTooltip'
import CommentWriteWindow from './../CommentWriteWindow/CommentWriteWindow';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  borderRadius: '7px',
  p: 2,
  textAlign: 'center'
}

function AnotherPost ({
  post,
  setComments,
  hasCommentWriteWindow,
  deletedCommentsCount,
  setDeletedCommentsCount
}) {
  const isRepost = post?.typePost === 'REPOST'
  const isComment = post?.typePost === 'COMMENT'
  let thisPost
  isRepost ? (thisPost = post?.originalPost) : (thisPost = post)
  const [isLiked, setIsLiked] = useState(thisPost?.hasMyLike)
  const [likes, setLikes] = useState(thisPost?.countLikes)
  const [isReposted, setIsReposted] = useState(thisPost?.hasMyRepost)
  const [reposts, setReposts] = useState(thisPost?.countRepost)
  const [countComments, setCountComments] = useState(thisPost?.countComments)
  const [error, setError] = useState(null)
  const [openCommentModal, setOpenCommentModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [postIsDeleted, setPostIsDeleted] = useState(false)
  const { token } = UseUserToken()
  const url = process.env.REACT_APP_SERVER_URL
  const postDate = formatPostDate(thisPost?.createdDate)
  const userId = getUserId()
  const followings = useSelector(state => state.user.followings)
  const dispatch = useDispatch()
  const isMinePost = thisPost?.user?.id == userId
  const isFollow = followings.includes(thisPost?.user?.id)

  useEffect(() => {
    if (deletedCommentsCount !== undefined && deletedCommentsCount !== 0) {
      setCountComments((prev) => prev - deletedCommentsCount)
    }
  }, [deletedCommentsCount])

  function comment () {
    setOpenCommentModal(true)
  }

  async function like () {
    try {
      const response = await axios.post(
        url + `/api/v1/likes/like/${thisPost.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (response.status === 200) {
        toggleLiked()
        setError(null)
      } else {
        setError(`Error ${response.status}: ${response.error}`)
      }
    } catch (err) {
      setError(`Error: ${err}`)
    }
  }

  async function repost () {
    try {
      const response = await axios.post(
        url + `/api/v1/post/${thisPost.id}/repost`,
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
      if (response.status === 200) {
        toggleRepost()
        setError(null)
      } else {
        setError(`Error ${response.status}: ${response.error}`)
      }
    } catch (err) {
      setError(`Error: ${err}`)
    }
  }

  function toggleLiked () {
    isLiked ? setLikes(likes - 1) : setLikes(likes + 1)
    setIsLiked(!isLiked)
  }

  async function repost () {
    try {
      const response = await axios.post(
        url + `/api/v1/post/${thisPost.id}/repost`,
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
      if (response.status === 200) {
        toggleRepost()
        setError(null)
      } else {
        setError(`Error ${response.status}: ${response.error}`)
      }
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

  function handleDeletePost () {
    setPostIsDeleted(true)
    setDeletedCommentsCount && setDeletedCommentsCount(prev => prev + 1)
  }

  async function deletePost () {
    try {
      const response = await axios.delete(url + `/api/v1/post/${thisPost.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      response.status === 200
        ? handleDeletePost()
        : setError(`Error ${response.status}: ${response.error}`)
    } catch (err) {
      setError(`Error: ${err}`)
    } finally {
      setOpenDeleteModal(false)
    }
  }

  async function toggleFollow () {
    try {
      let response
      if (!isFollow) {
        response = await axios.get(
          url + `/api/v1/subscribe/${thisPost.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        dispatch(addFollowing(thisPost.user.id))
      } else {
        response = await axios.get(
          url + `/api/v1/unsubscribe/${thisPost.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        dispatch(removeFollowing(thisPost.user.id))
      }
      response.status === 200
        ? setError(null)
        : setError(`Error ${response.status}: ${response.error}`)
    } catch (error) {
      setError(`Error: ${error}`)
    }
  }

  return postIsDeleted ? null : (
    <>
      <Card variant='outlined'>
        {isRepost && (
          <Box sx={{ pl: 1 }}>
            <Link to={'/user/' + post.user.id} className={styles.link}>
              <Typography
                variant='p'
                sx={{ display: 'flex', alignItems: 'center', color: 'grey' }}
              >
                <AutorenewRoundedIcon />
                {post.user?.firstName} {post.user?.lastName} has reposted
              </Typography>
            </Link>
          </Box>
        )}
        <CardContent
          sx={{ display: 'flex', alignItems: 'center', gap: 1, pt: 1, pb: 0 }}
        >
          <Link to={'/user/' + thisPost?.user?.id}>
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
                }
              }}
            >
              {thisPost.user.avatar ? (
                <Avatar
                  alt={`${thisPost?.user?.firstName} ${thisPost?.user?.lastName}`}
                  src={thisPost.user.avatar}
                  sx={{ width: 50, height: 50, alignSelf: 'flex-start' }}
                />
              ) : (
                <Avatar sx={{ width: 50, height: 50, alignSelf: 'flex-start' }}>
                  {thisPost?.user?.firstName.charAt(0)}
                  {thisPost?.user?.lastName.charAt(0)}
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
            <Link to={'/profile/' + thisPost?.user?.id} className={styles.link}>
              <Typography
                variant='h6'
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                {thisPost?.user?.firstName} {thisPost?.user?.lastName}
              </Typography>
            </Link>
            <Link to={'/profile/' + thisPost?.user?.id} className={styles.link}>
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                @{thisPost?.user?.username}
              </Typography>
            </Link>
            <Typography>
              ●{' '}
              <Link to={'/post/' + thisPost?.id} className={styles.link}>
                {postDate}
              </Link>
            </Typography>
          </Box>
        </CardContent>
        <CardContent className={styles.cardContent}>
          {isComment && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Link to={'/post/' + thisPost?.id} className={styles.postLink}>
                <Typography sx={{ color: 'grey' }}>Comment to</Typography>
              </Link>
              <Link
                to={'/profile/' + thisPost?.originalPost?.user?.id}
                className={styles.profileLink}
              >
                <Typography>
                  @{thisPost?.originalPost?.user?.username}
                </Typography>
              </Link>
            </Box>
          )}
          <Link to={'/post/' + thisPost?.id} className={styles.postLink}>
            <Typography paragraph={true} sx={{ wordWrap: 'break-word', mb: 0 }}>
              {thisPost?.description}
            </Typography>
            {thisPost?.photo != '' ? (
              <ImageListItem>
                <img src={thisPost?.photo}></img>
              </ImageListItem>
            ) : null}
          </Link>
          <CardActions>
            <CustomTooltip title='Add comment'>
              <Button onClick={() => comment()}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <MapsUgcRoundedIcon sx={{ color: 'grey' }} />
                  <Typography sx={{ color: 'grey', ml: 1 }}>
                    {countComments || null}
                  </Typography>
                </Box>
              </Button>
            </CustomTooltip>
            <CustomTooltip title='Repost'>
              <Button onClick={() => repost()}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <AutorenewRoundedIcon
                    sx={{ color: isReposted ? 'green' : 'grey' }}
                  />
                  <Typography
                    sx={{ color: isReposted ? 'green' : 'grey', ml: 1 }}
                  >
                    {reposts || null}
                  </Typography>
                </Box>
              </Button>
            </CustomTooltip>
            <CustomTooltip title='Like'>
              <Button onClick={() => like()}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
            </CustomTooltip>
            {isMinePost ? (
              <CustomTooltip title='Delete post'>
                <Button
                  onClick={() => setOpenDeleteModal(true)}
                  className={styles.button}
                >
                  <DeleteForeverOutlinedIcon sx={{ color: 'grey' }} />
                </Button>
              </CustomTooltip>
            ) : !isFollow ? (
              <CustomTooltip title='Follow'>
                <Button onClick={toggleFollow} className={styles.button}>
                  <PersonAddOutlinedIcon sx={{ color: 'grey' }} />
                </Button>
              </CustomTooltip>
            ) : (
              <CustomTooltip title='Unfollow'>
                <Button onClick={toggleFollow} className={styles.button}>
                  <VerifiedOutlinedIcon sx={{ color: 'primal' }} />
                </Button>
              </CustomTooltip>
            )}
          </CardActions>
          <Typography sx={{ color: 'red' }}> {error}</Typography>
        </CardContent>
      </Card>
      <ModalComment
        post={thisPost}
        commentsCount={countComments}
        open={openCommentModal}
        setOpenModal={setOpenCommentModal}
        setCommentsCount={setCountComments}
      />
      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <Box sx={style}>
          <Typography>Delete this post?</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button onClick={() => setOpenDeleteModal(false)}>
              <Typography>CANCEL</Typography>
            </Button>
            <Button onClick={() => deletePost()}>
              <Typography sx={{ fontWeight: 500 }}>DELETE</Typography>
            </Button>
          </Box>
        </Box>
      </Modal>
      {hasCommentWriteWindow && (
        <CommentWriteWindow
          postId={thisPost.id}
          setCommentsCount={setCountComments}
          setComments={setComments}
        />
      )}
    </>
  )
}

AnotherPost.propTypes = {
  post: PropTypes.object.isRequired,
  setComments: PropTypes.func,
  hasCommentWriteWindow: PropTypes.bool,
  deletedCommentsCount: PropTypes.number,
  setDeletedCommentsCount: PropTypes.func
}
export default AnotherPost
