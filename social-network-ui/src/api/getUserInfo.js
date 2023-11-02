import axios from 'axios'

export default async function getUserData(userId, token) {
	try {
		const { data }  = await axios.get(
			`${process.env.REACT_APP_SERVER_URL || ''}/api/v1/user/info/${userId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		return data
	} catch (error) {
		throw error
	}
}
