import axios from 'axios'

export default async function postRegistrationData(newUserObject) {
	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_SERVER_URL}/registration`,
			newUserObject
		)
		return data
	} catch (error) {
		throw error
	}
}
