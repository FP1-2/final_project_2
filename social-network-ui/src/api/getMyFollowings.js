import axios from 'axios'
import getUserToken from '../utils/getUserToken'
import getUserId from '../utils/getUserId'

const token = getUserToken()
const userId = getUserId()

export default async function getMyFollowings () {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL || ''}/api/v1/followings/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return data.map((user) =>  user.id )
  } catch (error) {
    throw error
  }
}
