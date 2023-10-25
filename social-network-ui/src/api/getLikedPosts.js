import axios from 'axios'

const url = process.env.REACT_APP_SERVER_URL

const getLikedPosts = async (token) => {
    const { data } = await axios.get(
      url + '/api/v1/likes/user',
  // url + '/api/v1/all-posts',
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
    )
    return data
}

export default getLikedPosts

