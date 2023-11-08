import axios from 'axios'

export default async function getUserFollowData(followType, userId, token) {
	try {
		const { data } = await axios.get(
			`${
				process.env.REACT_APP_SERVER_URL || ''
			}/api/v1/${followType}/${userId}`,
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
