import axios from 'axios'

export default async function editUserProfile(obj, token) {
	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_SERVER_URL || ''}/api/v1/edit`,
			obj,
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
