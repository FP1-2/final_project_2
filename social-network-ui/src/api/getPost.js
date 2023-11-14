import axios from 'axios'

const url = process.env.REACT_APP_SERVER_URL

const getPost = async (postId, token) => {
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
