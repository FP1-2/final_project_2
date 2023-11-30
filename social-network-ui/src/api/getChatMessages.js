import axios from 'axios'
export async function getChatMessages(chatID, token, page = 0, size = 10) {
	try {
		const { data } = await axios.get(
			`${
				process.env.REACT_APP_SERVER_URL || ''
			}/api/v1/get-messages-chat/${chatID}?page=${page}&size=${size}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		console.log(data)
		return data
	} catch (error) {
		throw error
	}
}
