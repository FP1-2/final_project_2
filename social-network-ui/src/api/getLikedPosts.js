import axios from 'axios'

const url = process.env.REACT_APP_SERVER_URL

const getLikedPosts = async (token, userId, page, size) => {
	try {
		const { data } = await axios.get(
			`${url}/api/v1/post-user-likes/${userId}?page=${page}&size=${size}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		)
		return data
	} catch (error) {
		throw error
	}
}

export default getLikedPosts
