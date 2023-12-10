import axios from 'axios'

const url = process.env.REACT_APP_SERVER_URL || "";

const getComments = async (postId, token, page, size) => {
  try {
    const { data } = await axios.get(
      `${url}/api/v1/post/${postId}/get-comments?page=${page}&size=${size}`,
      {
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
        }
      }
    )
    return data
  } catch (error) {
    throw error
  }
}

export default getComments
