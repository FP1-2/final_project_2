import React, { useState } from 'react'
import { Button, Modal, Box, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import { modalBoxstyle as style } from './../../styles/modalBoxStyle'
import CustomTooltip from '../Custom Tooltip/CustomTooltip'
import { useSelector } from 'react-redux'
import UseUserToken from '../../hooks/useUserToken'
import MultilineTextFields from '../HomePage/WriteInput/MultilineTextFields'
import PostButton from '../PostButton/PostButton'
import { Image } from 'cloudinary-react'
import ImageInput from '../HomePage/ImageInput/ImageInput'
import axios from 'axios'
import getUserId from '../../utils/getUserId'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import AdaptiveAvatar from '../AdaptiveAvatar/AdaptiveAvatar'

function ModalAddPost ({ open, setOpenModal }) {
  const [description, setDescription] = useState('')
  const [photo, setPhoto] = useState('')
  const [error, setError] = useState(null)
  const [photoLoading, setPhotoLoading] = useState(null)
  const userData = useSelector(state => state.user.userData)
  const { token } = UseUserToken()
  const userId = getUserId()
  const navigate = useNavigate()

  const handleClose = () => {
    setPhoto('')
    setDescription('')
    setError(null)
    setOpenModal(false)
  }

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

  const handlePost = async () => {
    if (!description && !photo) return
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL || ''}/api/v1/post`,
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
        navigate(`/post/${response.data.id}`)
        handleClose()
      } else {
        setError(`Error ${response.status}: ${response.data}`)
      }
    } catch (err) {
      setError(`Error: ${err.message}`)
    }
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {userData && (
          <>
            <CustomTooltip title='Close'>
              <Button onClick={handleClose}>
                <CloseIcon />
              </Button>
            </CustomTooltip>
            <Box sx={{ display: 'flex', width: '100%', pl: 2, pr: 2, gap: 1 }}>
              <AdaptiveAvatar
                src={userData?.avatar}
                alt={`${userData?.firstName} ${userData?.lastName}`}
                firstName={userData?.firstName || '?'}
              />
              <MultilineTextFields
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <PostButton onClick={handlePost}>Post</PostButton>
            </Box>
            {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}
            {photo ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
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
              </Box>
            ) : (
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <ImageInput
                  file={photo}
                  onChange={handlePhotoInput}
                  inputName='TweetButtonInput'
                />
              </Box>
            )}
            {photoLoading && <CircularProgress />}
          </>
        )}
      </Box>
    </Modal>
  )
}

ModalAddPost.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
}
export default ModalAddPost
