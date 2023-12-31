import axios from "axios";

export default async function postRegistrationData(newUserObject) {
	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_SERVER_URL || ''}/api/v1/registration`,
			newUserObject
		)
		return data
	} catch (error) {
		throw error
	}
}

export async function postLoginData(loginObject) {
	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_SERVER_URL || ''}/api/v1/login`,
			loginObject
		)

		return data
	} catch (error) {
		console.log(error)
	}
}
