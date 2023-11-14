import React, { useState } from 'react'
import { Button, Modal, Box, Avatar, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import { modalBoxstyle as style } from './../../styles/modalBoxStyle'
import CustomTooltip from '../Custom Tooltip/CustomTooltip'
import { useSelector } from 'react-redux'
import UseUserToken from '../../hooks/useUserToken'
import styles from './ModalAddPost.module.scss'
import MultilineTextFields from '../HomePage/WriteInput/MultilineTextFields'
import PostButton from '../PostButton/PostButton'
import { Image } from 'cloudinary-react'
import ImageInput from '../HomePage/ImageInput/ImageInput'
import axios from 'axios'
import getUserId from '../../utils/getUserId'
import { useNavigate } from 'react-router-dom'

function ModalAddPost ({ open, setOpenModal }) {
  const [description, setDescription] = useState('')
  const [photo, setPhoto] = useState('')
  const [error, setError] = useState(null)
    const [postId, setPostId] = useState(null)
  const { avatar, firstName, lastName } = useSelector(
    state => state.user.userData
  )
  const { token } = UseUserToken()
    const userId = getUserId()
    const navigate = useNavigate()

  const handleClose = () => {
    setPhoto('')
    setDescription('')
    setError(null)
    setOpenModal(false)
  }

  const handlePhotoInput = event => {
    const formData = new FormData()
    formData.append('file', event.target.files[0])
    formData.append('upload_preset', 'danit2023')
    axios
      .post('https://api.cloudinary.com/v1_1/dl4ihoods/image/upload', formData)
      .then(response => {
        setPhoto(response.data.url)
      })
  }

  const handleSubmit = event => {
    event.preventDefault()
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
          setPostId(response.data.id)
          navigate(`/post/${postId}`)
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
        <CustomTooltip title='Close'>
          <Button onClick={handleClose}>
            <CloseIcon />
          </Button>
        </CustomTooltip>
        <form className={styles.writeWindow} onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', width: '100%', pl: 2, pr: 2 }}>
            {avatar ? (
              <Avatar
                alt={`${firstName} ${lastName}`}
                src={avatar}
                sx={{ width: 50, height: 50, mr: 2, alignSelf: 'flex-start' }}
              />
            ) : (
              <Avatar
                sx={{ width: 50, height: 50, mr: 2, alignSelf: 'flex-start' }}
              >
                {firstName.charAt(0)}
                {lastName.charAt(0)}
              </Avatar>
            )}

            <MultilineTextFields
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <PostButton onClick={handlePost}>Post</PostButton>
          </Box>
          {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}
            {photo ? (
              <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
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
              <ImageInput file={photo} onChange={handlePhotoInput} />
            )}
        </form>
      </Box>
    </Modal>
  )
}

ModalAddPost.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
}
export default ModalAddPost
