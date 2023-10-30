import axios from 'axios'

export default async function getPostsById(userId, token) {
	try {
		const { data } = await axios.get(
			`${
				process.env.REACT_APP_SERVER_URL || ''
			}/api/v1/profile-posts/${userId}`,
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
