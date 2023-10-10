import axios from 'axios'

export default async function postRegistrationData(newUserObject) {
	try {
		const { data } = await axios.post(
			`api/v1/registration`,
			newUserObject
		)
		return data
	} catch (error) {
		throw error
	}
}
