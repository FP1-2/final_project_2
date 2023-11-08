import axios from 'axios'
import getUserToken from '../utils/getUserToken'
import getUserId from '../utils/getUserId'

const url = process.env.REACT_APP_SERVER_URL
const token = getUserToken()
const userId = getUserId()

const getLikedPosts = async () => {
  try {
    const { data } = await axios.get(
      url + '/api/v1/post-user-likes/' + userId,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    return data
  } catch (error) {
    throw error
  }
}


export default getLikedPosts

