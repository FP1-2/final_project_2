import axios from 'axios'
import UseUserToken from '../hooks/useUserToken'

export default async function getUserData(userId, token) {
	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_SERVER_URL}/api/v1/user/info/${userId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		console.log(data)
		return data
	} catch (error) {
		throw error
	}
}
