import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// components
import ImageInput from '../HomePage/ImageInput/ImageInput'
import MultilineTextFields from '../HomePage/WriteInput/MultilineTextFields'
import PostButton from '../PostButton/PostButton'
import CustomTooltip from '../Custom Tooltip/CustomTooltip'
import AdaptiveAvatar from '../AdaptiveAvatar/AdaptiveAvatar'
// other libraries
import PropTypes from 'prop-types'
import axios from 'axios'
// Cloudinary
import { Image } from 'cloudinary-react'
// hooks
import UseUserToken from './../../hooks/useUserToken'
// utils
import getUserId from '../../utils/getUserId'
// MUI
import Box from '@mui/material/Box'
import { Button, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CircularProgress from '@mui/material/CircularProgress'

function CommentWriteWindow ({ postId, close, setCommentsCount, setComments }) {
  // states
  const [description, setDescription] = useState('')
  const [photo, setPhoto] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [photoLoading, setPhotoLoading] = useState(null)
  // other hooks
  const navigate = useNavigate()
  const userData = useSelector(state => state.user.userData)
  const { token } = UseUserToken()
  // other
  const userId = getUserId()

  // handle succesfull comment
  const handleModalComment = () => {
    setSuccess('Comment sent. Click to open the post')
    setTimeout(() => {
      close()
    }, 3000)
  }

  // input cleanup
  const handleComment = () => {
    setPhoto('')
    setDescription('')
  }

  // photo input
  const handlePhotoInput = async event => {
    try {
      const selectedFile = event.target.files[0]
      if (selectedFile) {
        const formData = new FormData()
        formData.append('file', selectedFile)
        formData.append('upload_preset', 'danit2023')
        setPhotoLoading(true)
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dl4ihoods/image/upload',
          formData
        )
        setPhoto(response.data.url)
        setError(null)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setPhotoLoading(false)
    }
  }

  // post a comment
  const handlePost = async () => {
    if (!description && !photo) return
    try {
      const response = await axios.post(
        `${
          process.env.REACT_APP_SERVER_URL || ''
        }/api/v1/post/${postId}/comment`,
        {
          id: 0,
          userId: userId,
          photo: photo,
          description: description
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.status === 200) {
        setError(null)
        setCommentsCount(prev => prev + 1)
        setComments && setComments(prev => [response.data, ...prev])
        console.log(response.data)
        close ? handleModalComment() : handleComment()
      } else {
        setError(`Error ${response.status}: ${response.data}`)
      }
    } catch (err) {
      setError(`Error: ${err.message}`)
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', width: '100%', gap: 1, mt: 2, pl: 2, pr: 2 }}>
        {userData && (
          <AdaptiveAvatar
            src={userData?.avatar}
            alt={`${userData?.firstName} ${userData?.lastName}`}
            size='3rem'
            firstName={userData?.firstName || '?'}
          />
        )}

        <MultilineTextFields
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <PostButton onClick={handlePost} disabled={!description && !photo}>
          Post
        </PostButton>
      </Box>
      {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}
      {success && (
        <Button onClick={() => navigate(`/post/${postId}`)}>
          <Typography sx={{ color: 'green' }}>{success}</Typography>
        </Button>
      )}
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {photo ? (
          <>
            <CustomTooltip title='Delete photo'>
              <Button
                onClick={() => {
                  setPhoto('')
                }}
              >
                <CloseIcon />
              </Button>
            </CustomTooltip>
            <Image
              style={{
                width: '50%',
                objectFit: 'cover'
              }}
              cloudName='dl4ihoods'
              publicId={photo}
            />
          </>
        ) : (
          <>
            {photoLoading ? (
              <CircularProgress />
            ) : (
              <ImageInput
                file={photo}
                onChange={handlePhotoInput}
                inputName='TweetButtonInput'
              />
            )}
          </>
        )}
      </Box>
    </>
  )
}

export default CommentWriteWindow

CommentWriteWindow.propTypes = {
  postId: PropTypes.number.isRequired,
  close: PropTypes.func,
  setCommentsCount: PropTypes.func.isRequired,
  setComments: PropTypes.func
}
