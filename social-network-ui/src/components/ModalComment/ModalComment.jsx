import React from 'react'
import {
  Button,
  Modal,
  Box,
  Avatar,
  Typography,
  Card,
  CardContent
} from '@mui/material'
import { PropTypes } from 'prop-types'
import formatPostDate from '../../utils/formatPostDate'
import CloseIcon from '@mui/icons-material/Close'
import CommentWriteWindow from './CommentWriteWindow'
import { Link } from 'react-router-dom'
import styles from '../AnotherPost/AnotherPost.module.scss'
import { modalBoxstyle as style } from './../../styles/modalBoxStyle'

function ModalComment ({
  post,
  setOpenModal,
  open,
  commentsCount,
  setCommentsCount
}) {
  let postDate
  post ? (postDate = formatPostDate(post.createdDate)) : null
  const handleClose = () => {
    setOpenModal(false)
  }

  return (
    <Modal open={open} onClose={() => handleClose()}>
      <Box sx={style}>
        <Button onClick={() => setOpenModal(false)}>
          <CloseIcon />
        </Button>
        <Card variant='outlined' sx={{backgroundColor: 'rgb(241, 247, 255)'}}>
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
                  }
                }}
              >
                {post.user.avatar ? (
                  <Avatar
                    alt={`${post.user.firstName} ${post.user.lastName}`}
                    src={post.user.avatar}
                    sx={{
                      width: 50,
                      height: 50,
                      mr: 2,
                      alignSelf: 'flex-start'
                    }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 50,
                      height: 50,
                      mr: 2,
                      alignSelf: 'flex-start'
                    }}
                  >
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
              <Link to={'/user/' + post.user.id} className={styles.link}>
                <Typography
                  variant='h6'
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  {post.user.firstName} {post.user.lastName}
                </Typography>
              </Link>
              <Link to={'/user/' + post.user.id} className={styles.link}>
                <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                  @{post.user.username}
                </Typography>
              </Link>
              <Link to={'/post/' + post.id} className={styles.link}>
                <Typography>{postDate}</Typography>
              </Link>
            </Box>
          </CardContent>
          <CardContent>
            <Typography
              paragraph={true}
              sx={{ maxWidth: '90%', wordWrap: 'break-word' }}
            >
              {post.description}
            </Typography>
          </CardContent>
        </Card>
        <CommentWriteWindow
          postId={post.id}
          close={handleClose}
          commentsCount={commentsCount}
          setCommentsCount={setCommentsCount}
        />
      </Box>
    </Modal>
  )
}

ModalComment.propTypes = {
  post: PropTypes.object,
  setOpenModal: PropTypes.func,
  open: PropTypes.bool,
  setCommentsCount: PropTypes.func,
  commentsCount: PropTypes.number
}
export default ModalComment
