import axios from 'axios'

const url = process.env.REACT_APP_SERVER_URL

const getLikedPosts = async (token, userId) => {
    const { data } = await axios.get(
      url + '/api/v1/post-user-likes/' + userId,
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

