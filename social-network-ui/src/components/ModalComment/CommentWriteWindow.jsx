import React, { useState, useEffect } from 'react'
import ImageInput from '../HomePage/ImageInput/ImageInput'
import MultilineTextFields from '../HomePage/WriteInput/MultilineTextFields'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import { Image } from 'cloudinary-react'
import jwt from 'jwt-decode'
import UseUserToken from './../../hooks/useUserToken'
import getUserId from '../../utils/getUserId'
import getUserData from '../../api/getUserInfo'
import styles from './CommentWriteWindow.module.scss'
import axios from 'axios'
import { Button, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PostButton from '../PostButton/PostButton'
import { redirect } from 'react-router-dom'

function CommentWriteWindow ({ postId, close }) {
  const { token } = UseUserToken()
  const userId = getUserId()
  const [description, setDescription] = useState('')
  const [photo, setPhoto] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function fetchData () {
      try {
        const user = await getUserData(userId, token)
        setUser(user)
      } catch (error) {
        setError(error)
      }
    }

    fetchData()
  }, [userId, token])

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
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL || ''}/api/v1/post/${postId}/comment`,
        {
          id: 0,
          userId: userId,
          photo: photo,
          description: description,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess('Comment sent. Click to open the post');
        setTimeout(() => {
          close()
        }, 1000);

      } else {
        setError(`Error ${response.status}: ${response.data}`);
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  };

  return (
    <form className={styles.writeWindow} onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex' }}>
        {user?.avatar ? (
          <Avatar
            alt={`${user?.firstName} ${user?.lastName}`}
            src={user?.avatar}
            sx={{ width: 50, height: 50, mr: 2, alignSelf: 'flex-start' }}
          />
        ) : (
          <Avatar
            sx={{ width: 50, height: 50, mr: 2, alignSelf: 'flex-start' }}
          >
            {user?.firstName.charAt(0)}
            {user?.lastName.charAt(0)}
          </Avatar>
        )}

        <MultilineTextFields
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <PostButton onClick={handlePost}>Post</PostButton>
      </Box>
      {error && <Typography sx={{color: 'red'}}>{error}</Typography>}
      {success && <Button onClick={redirect(`/post/${postId}`)}><Typography sx={{color: 'green'}}>{success}</Typography></Button>}
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {photo ? (
          <>
            <Button
              onClick={() => {
                setPhoto(null)
              }}
            >
              <CloseIcon />
            </Button>
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
          <ImageInput file={photo} onChange={handlePhotoInput} />
        )}
      </Box>
    </form>
  )
}

export default CommentWriteWindow

CommentWriteWindow.propTypes = {
  postId: PropTypes.number,
  close: PropTypes.func
}