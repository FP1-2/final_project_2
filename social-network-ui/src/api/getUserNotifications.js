import axios from 'axios'

export default async function getUserNotifications(token, page = 1, size = 10) {
	try {
		const { data } = await axios.get(
			`${
				process.env.REACT_APP_SERVER_URL || ''
			}/api/v1/notifications/all?page=${page}&size=${size}`,
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

export async function markAsReadUserNotification(notificationId, token) {
	try {
		const { data } = await axios.post(
			`${
				process.env.REACT_APP_SERVER_URL || ''
			}/api/v1/notifications/markAsRead/${notificationId}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)

		return data
	} catch (error) {
		console.log(error)
	}
}
