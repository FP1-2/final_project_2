import { createAsyncThunk } from '@reduxjs/toolkit'
import { getChats } from '../../api/getChats'
import { getChatMessages } from '../../api/getChatMessages'
import { getChatMembers } from '../../api/getChatMembers'
import getUserToken from '../../utils/getUserToken'

export const fetchChats = createAsyncThunk(
	'chats/fetchChats',
	async (userId, { dispatch, rejectWithValue }) => {
		try {
			const token = getUserToken()

			if (!userId) {
				return rejectWithValue('User ID not available')
			}
			const chatsIDs = await getChats(userId, token)
			const chatPromises = chatsIDs.map(async chatId => {
				const data = await getChatMessages(chatId, token)
				console.log(data)
				const chatMembers = await getChatMembers(chatId, token)
				let lastMessage = null
				userId = Number(userId)

				if (data.length > 0) {
					lastMessage = data[0]
				} else {
					lastMessage = { text: '', user: chatMembers[0] }
				}

				if (lastMessage.user.id === userId) {
					let index = chatMembers.findIndex(x => x.id !== userId)

					if (index >= 0) {
						lastMessage.user = chatMembers[index]
					}
				}

				return { id: chatId, lastMessage: lastMessage, members: chatMembers }
			})

			const updatedChats = await Promise.all(chatPromises)

			return updatedChats
		} catch (error) {
			if (error.response) {
				dispatch(
					setError(`Error ${error.response?.status}: ${error.response?.data}`)
				)
			} else if (error.request) {
				dispatch(setError('Error: no response'))
			} else {
				dispatch(setError(`Error: ${error?.message}`))
			}
			return rejectWithValue(error)
		}
	}
)
