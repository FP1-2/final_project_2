import React, { useState } from 'react'
import ImageInput from '../ImageInput/ImageInput'
import MultilineTextFields from '../WriteInput/MultilineTextFields'
import { Button, Modal, Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Image } from 'cloudinary-react'
import getUserId from '../../../utils/getUserId'
import UseUserToken from '../../../hooks/useUserToken'
import AdaptiveAvatar from '../../AdaptiveAvatar/AdaptiveAvatar'
import { useSelector } from 'react-redux'
import PostButton from '../../PostButton/PostButton'
import CustomTooltip from '../../Custom Tooltip/CustomTooltip'
import CircularProgress from '@mui/material/CircularProgress'
import CloseIcon from '@mui/icons-material/Close'

const TwitterWriteWindow = ({ setTweetPost, tweetPosts }) => {
  const [description, setDescription] = useState('')
  const [photo, setPhoto] = useState('')
  const userId = getUserId()
  const { token } = UseUserToken()
  const [error, setError] = useState(null)
  const [photoLoading, setPhotoLoading] = useState(null)
  const userData = useSelector(state => state.user.userData)

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
        setTweetPost([response.data, ...tweetPosts])
        setDescription('')
        setPhoto('')
      } else {
        setError(`Error ${response.status}: ${response.data}`)
      }
    } catch (err) {
      setError(`Error: ${err.message}`)
    }
  }

  return (
    <Box sx={{ m: 2 }}>
      <Box sx={{ width: '100%', display: 'flex', gap: 1 }}>
        {userData && (
          <AdaptiveAvatar
            src={userData?.avatar}
            alt={`${userData?.firstName} ${userData?.lastName}`}
            big={false}
            firstName={userData?.firstName || '?'}
          />
        )}
        <MultilineTextFields
          // sx={{}}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        {!photo && (
          <Box sx={{alignSelf: 'end'}}>
            <ImageInput
              file={photo}
              onChange={handlePhotoInput}
              inputName='HomePageInput'
            />
          </Box>
        )}
        <PostButton onClick={handlePost}>Post</PostButton>
      </Box>
      {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}
      {photo && (
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
      )}
      {photoLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  )
}

TwitterWriteWindow.propTypes = {
  setTweetPost: PropTypes.func.isRequired,
  tweetPosts: PropTypes.array.isRequired
}

export default TwitterWriteWindow
