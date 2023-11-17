import axios from 'axios'

const url = process.env.REACT_APP_SERVER_URL || ''

const getAllPosts = async (token, page, size) => {
  try {
      const response = await axios.get(url + `/api/v1/all-posts?page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export default getAllPosts
