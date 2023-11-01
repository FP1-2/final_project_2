import React, { useState, useEffect } from 'react'
import ImageInput from '../HomePage/ImageInput/ImageInput'
import MultilineTextFields from '../HomePage/WriteInput/MultilineTextFields'
import Avatar from '@mui/material/Avatar'
import PropTypes from 'prop-types'
import { Image } from 'cloudinary-react'
import jwt from 'jwt-decode'
import UseUserToken from './../../hooks/useUserToken'
import getUserId from '../../utils/getUserId'
import getUserData from '../../api/getUserInfo'
import styles from '../HomePage/TwitterWriteWindow/TwitterWriteWindow.module.scss'
import axios from 'axios'

function CommentWriteWindow ({ postId }) {
    const { token } = UseUserToken()
  const userId = getUserId()
  const [description, setDescription] = useState('')
  const [photo, setPhoto] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    getUserData(userId, token).then((user) => {setUser(user)})
    console.log(user)
  }, [])

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

  const handlePost = async function postComment (token, postId, photo, description) {
    try {
      const { status, error } = await axios.post(
        `${url}/api/v1/post/${postId}/comment`,
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
      status === 200
        ? setSuccess('Comment sent')
        : setError(`Error ${status}: ${error}`)
    } catch (err) {
      setError(`Error: ${err}`)
    }
  }

  return (
      <form className={styles.writeWindow} onSubmit={handleSubmit}>
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

        <div className={styles.writeWindowBody}>
          <MultilineTextFields
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          {photo && (
            <Image
              style={{ width: 360, height: 300, objectFit: 'cover' }}
              cloudName='dl4ihoods'
              publicId={photo}
            ></Image>
          )}
          <div className={styles.writeWindowFooter}>
            <div>
              <ImageInput file={photo} onChange={handlePhotoInput} />
            </div>
                  <button onClick={handlePost} className={styles.postBtn}>Post</button>
          </div>
        </div>
      </form>
  )
}

export default CommentWriteWindow

CommentWriteWindow.propTypes = {
  postId: PropTypes.number
}
