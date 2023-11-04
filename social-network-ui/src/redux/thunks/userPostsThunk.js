import axios from 'axios'
import { userPosts } from '../slices/userSlice'
import getUserToken from '../utils/getUserToken'
import getUserId from './../../utils/getUserId'

export default fetchPosts = () => async dispatch => {
  const userId = getUserId()
  const token = getUserToken()

  try {
    const response = await axios.get(
      `${
        process.env.REACT_APP_SERVER_URL || ''
      }/api/v1/profile-posts/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      )
      const posts = response.data.map((post) => { { id: post.id, likes: post.likes, } })
    dispatch(userPosts(response.data))
  } catch (error) {
    console.error(error.message)
  }
}
