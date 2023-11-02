import React from 'react'
import {
  Button,
  Modal,
  Box,
  Avatar,
  Typography,
  Card,
  CardContent,
} from '@mui/material'
import { PropTypes } from 'prop-types'
import { useState } from 'react'
import formatPostDate from '../../utils/formatPostDate'
import CloseIcon from '@mui/icons-material/Close';
import CommentWriteWindow from './CommentWriteWindow'
import { Link } from 'react-router-dom'
import styles from '../Post/post.module.scss'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
  minHeight: '50vh',
  overflowY: 'auto',
  maxHeight: '100vh',
	bgcolor: 'background.paper',
	border: '1px solid #000',
	boxShadow: 24,
    borderRadius: '7px',
	p: 2,
	'@media (min-width: 1800px)': {
		width: '40%',
	},
	'@media (max-width: 1380px)': {
		width: '55%',
	},
	'@media (max-width: 1280px)': {
		width: '60%',
	},
	'@media (max-width: 1180px)': {
		width: '70%',
	},
	'@media (max-width: 960px)': {
		width: '80%',
	},
	'@media (max-width: 780px)': {
		width: '90%',
	},
	'@media (max-width: 600px)': {
		width: '100%',
		minHeight: '100vh',
	},
}

function ModalComment({ post, setOpenModal, open }) {
    const [description, setDescription] = useState('')
    let postDate
    post ? postDate = formatPostDate(post.createdDate) : null;
    function handleClose() {
        setOpenModal(false)
    }

  return (
      <Modal
      open={open}
          onClose={() => handleClose()}>
          <Box sx={style}>
    <Button onClick={() => setOpenModal(false)}><CloseIcon/></Button>
      <Card variant='outlined'>
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Link
          to={'/user/' + post.user.id}
        >
          <Box
            sx={{
              position: "relative",
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                m: "-2px",
                borderRadius: "50%",
                // background:
                //   'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
              },
            }}
          >
            {post.user.avatar ? (
              <Avatar
                alt={`${post.user.firstName} ${post.user.lastName}`}
                src={post.user.avatar}
                sx={{ width: 50, height: 50, mr: 2, alignSelf: "flex-start" }}
              />
            ) : (
              <Avatar
                sx={{ width: 50, height: 50, mr: 2, alignSelf: "flex-start" }}
              >
                {post.user.firstName.charAt(0)}
                {post.user.lastName.charAt(0)}
              </Avatar>
            )}
          </Box>
        </Link>
        <Box sx={{display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center'}}>
        <Link
          to={'/user/' + post.user.id}
          className={styles.link}
        >
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {post.user.firstName} {post.user.lastName}
          </Typography>
        </Link>
        <Link
          to={'/user/' + post.user.id}
          className={styles.link}
        >
          <Typography sx={{ display: 'flex', alignItems: 'center' }}>
            @{post.user.username}
          </Typography>
        </Link>
        <Link
          to={'/post/' + post.id}
          className={styles.link}
        >
          <Typography>{postDate}</Typography>
          </Link>
          </Box>
      </CardContent>
        <CardContent>
        <Typography paragraph={true} sx={{maxWidth: '90%', wordWrap: 'break-word'}}>{post.description}</Typography>
                      {/* <Typography paragraph={true}>{post.photo}</Typography> */}
          {/* <Typography sx={{ color: 'red' }}> {error}</Typography> */}
        </CardContent>
              </Card>
        <CommentWriteWindow postId={post.id}/>
     </Box>
    </Modal>
  )
}

ModalComment.propTypes = {
    post: PropTypes.object,
    setOpenModal: PropTypes.func,
    open: PropTypes.bool
}
export default ModalComment
