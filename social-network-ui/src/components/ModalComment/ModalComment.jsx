import React from 'react'
import {
  Button,
  Modal,
  Box,
  Typography,
  Card,
  CardContent
} from '@mui/material'
import { PropTypes } from 'prop-types'
import formatPostDate from '../../utils/formatPostDate'
import CloseIcon from '@mui/icons-material/Close'
import { Link } from 'react-router-dom'
import styles from '../AnotherPost/AnotherPost.module.scss'
import { modalBoxstyle as style } from './../../styles/modalBoxStyle'
import CustomTooltip from '../Custom Tooltip/CustomTooltip'
import CommentWriteWindow from './../CommentWriteWindow/CommentWriteWindow'
import AdaptiveAvatar from '../AdaptiveAvatar/AdaptiveAvatar'

function ModalComment ({
  post,
  setOpenModal,
  open,
  setCommentsCount,
  setComments
}) {
  let postDate
  post ? (postDate = formatPostDate(post.createdDate)) : null
  const handleClose = () => {
    setOpenModal(false)
  }

  return (
    <Modal open={open} onClose={() => handleClose()}>
      <Box sx={style}>
        <CustomTooltip title='Close'>
          <Button onClick={() => setOpenModal(false)}>
            <CloseIcon />
          </Button>
        </CustomTooltip>
        <Card variant='outlined' sx={{ backgroundColor: 'rgb(241, 247, 255)' }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Link to={'/profile/' + post?.user?.id}>
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
                <AdaptiveAvatar
                  src={post?.user?.avatar}
                  alt={`${post?.user?.firstName} ${post?.user?.lastName}`}
                  firstName={post?.user?.firstName || '?'}
                  size='3rem'
                />
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
          setCommentsCount={setCommentsCount}
          setComments={setComments}
        />
      </Box>
    </Modal>
  )
}

ModalComment.propTypes = {
  post: PropTypes.object.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setCommentsCount: PropTypes.func.isRequired,
  setComments: PropTypes.func
}
export default ModalComment
