import { createSlice } from '@reduxjs/toolkit'

import UseUserToken from '../../hooks/useUserToken'
import getUserId from '../../utils/getUserId'
import axios from 'axios'

const userId = getUserId()

const initialState = {
	chats: null,
	error: null,
	messages: null,
	chatId: null,
	newChatMembers: null,
	modalProps: {
		isOpen: false,
	},
}

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setChats: (state, action) => {
			return { ...state, chats: action.payload }
		},
		setError: (state, action) => {
			return { ...state, error: action.payload }
		},
		setMessages: (state, action) => {
			return { ...state, messages: action.payload }
		},
		setChatId: (state, action) => {
			return { ...state, chatId: action.payload }
		},
		addChatMember: (state, action) => {
			return { ...state, newChatMembers: action.payload }
		},
		removeChatMember: (state, action) => {
			return { ...state, newChatMembers: action.payload }
		},
		openChatModal: (state, action) => {
			state.modalProps.isOpenChat = true
		},
		closeChatModal: state => {
			state.modalProps.isOpenChat = false
		},
	},
})

export const {
	setChats,
	setError,
	setMessages,
	setChatId,
	openChatModal,
	closeChatModal,
	addChatMember,
	removeChatMember,
} = chatSlice.actions

// export const fetchChats = (token) => async (dispatch) => {
//   try {
//     const chatsIDs = await getChats(userId, token);
//     const chatPromises = chatsIDs.map(async (chatId) => {
//       const data = await getChatMembers(chatId, token);
//       return { id: chatId, members: data };
//     });

//     const updatedChats = await Promise.all(chatPromises);
//     dispatch(setChats(updatedChats));
//     console.log(updatedChats);
//   } catch (error) {
//     if (error.response) {
//       dispatch(
//         setError(`Error ${error.response?.status}: ${error.response?.data}`)
//       );
//     } else if (error.request) {
//       dispatch(setError("Error: no response"));
//     } else {
//       dispatch(setError(`Error: ${error?.message}`));
//     }
//   }
// };

export const fetchChats = token => async dispatch => {
	try {
		const chatsIDs = await getChats(userId, token)
		const chatPromises = chatsIDs.map(async chatId => {
			const data = await getChatMessages(chatId, token)
			let lastMessage = null
			if (data.length > 0) {
				lastMessage = data[data.length - 1]
			} else {
				let chatMembers = await getChatMembers(chatId, token)
				lastMessage = {
					text: '',
					user: chatMembers.length > 1 ? chatMembers[1] : chatMembers[0],
				}
			}
			return { id: chatId, lastMessage: lastMessage }
		})

		const updatedChats = await Promise.all(chatPromises)
		dispatch(setChats(updatedChats))
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
	}
}

export async function getChatMembers(chatID, token) {
	try {
		const { data } = await axios.get(
			`${
				process.env.REACT_APP_SERVER_URL || ''
			}/api/v1/get-members-chat/${chatID}`,
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

export async function getChatMessages(chatID, token) {
	try {
		const { data } = await axios.get(
			`${
				process.env.REACT_APP_SERVER_URL || ''
			}/api/v1/get-messages-chat/${chatID}`,
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

export async function getChats(userId, token) {
	try {
		const { data } = await axios.get(
			`${
				process.env.REACT_APP_SERVER_URL || ''
			}/api/v1/get-chats-user/${userId}`,
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

export async function createMessage(message, token) {
	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_SERVER_URL || ''}/api/v1/message`,

			message,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			}
		)
		return data
	} catch (error) {
		throw error
	}
}
export async function createChat(chat, token) {
	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_SERVER_URL || ''}/api/v1/create-chat`,

			chat,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			}
		)
		return data
	} catch (error) {
		throw error
	}
}
export function getAllUsers() {
	try {
		// const { data } = await axios.get(
		//   `${process.env.REACT_APP_SERVER_URL || ''}/api/v1/get-chats-user/${userId}`,
		//   {
		//     headers: {
		//       Authorization: `Bearer ${token}`,
		//     },
		//   }
		// );

		const data = [
			{
				id: 63,
				username: 'string',
				firstName: 'Alex',
				lastName: 'Honchar',
				avatar:
					'https://res.cloudinary.com/doenettec/image/upload/v1699105589/m67rqx8jtietayb4qr43.jpg',
			},
			{
				id: 78,
				username: 'Test',
				firstName: 'Ivan',
				lastName: 'Ivanov',
				avatar: 'https://klike.net/uploads/posts/2019-03/1551511866_11.jpg',
			},
			{
				id: 62,
				username: 'Camel',
				firstName: 'Jon',
				lastName: 'Sidorov',
				avatar: 'https://klike.net/uploads/posts/2019-03/1551511866_11.jpg',
			},
		]

		return data
	} catch (error) {
		throw error
	}
}

export default chatSlice.reducer
