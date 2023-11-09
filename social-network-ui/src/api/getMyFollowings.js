import axios from 'axios'


export default async function getMyFollowings(token, userId) {
	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_SERVER_URL || ''}/api/v1/followings/${userId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		return data.map(user => user.id)
	} catch (error) {
		throw error
	}
}
