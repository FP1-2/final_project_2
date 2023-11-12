import axios from 'axios'
import getUserToken from '../utils/getUserToken'

const url = process.env.REACT_APP_SERVER_URL
const token = getUserToken()

const getPost = async (postId) => {
  try {
    const { data } = await axios.get(
      url + '/api/v1/post/' + postId,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return data
  } catch (error) {
    throw error
  }
}

export default getPost
