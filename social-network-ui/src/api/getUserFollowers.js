import axios from 'axios'
export default async function getUserFollowers(userId, token) {
	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_SERVER_URL || ''}/api/v1/followers/${userId}`,
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
