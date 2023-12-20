import React, { useEffect } from 'react'
import { setChatId, setError, setMessages } from '../../redux/slices/chatSlice'
import { getAllUsers } from '../../api/getAllUsers'
import { closeChatModal, setUsers } from '../../redux/slices/chatSlice'
import { getChatMessages } from '../../api/getChatMessages'
import { createChat } from '../../api/postCreateChat'
import { useDispatch, useSelector } from 'react-redux'
import { fetchChats } from '../../redux/thunks/chatThunk'
import {
	Box,
	Modal,
	ThemeProvider,
	TextField,
	Button,
	Typography,
} from '@mui/material'
import { createTheme } from '@mui/material/styles'
import ModalForm from './ModalForm'
import UseUserToken from '../../hooks/useUserToken'
import Chats from '../Chats/Chats'

function ModalNewChat() {
	const { token } = UseUserToken()
	const chatMember = useSelector(state => state.chat.newChatMembers)
	const users = useSelector(state => state.chat.users)
	const chats = useSelector(state => state.chat.chats)
	const userId = useSelector(state => state.user?.userId)
	const dispatch = useDispatch()

	const isOpen = useSelector(state => state.chat.modalProps.isOpenChat)
	const handleCloseModal = () => {
		dispatch(closeChatModal(!isOpen))
	}

	async function findUsers(event) {
		if (!event.target.value) {
			dispatch(setUsers([]))
			return
		}
		const username = event.target.value
		const users = await getAllUsers(username, token)
		dispatch(setUsers(users))
	}
	async function sendChat() {
		try {
			let chatId = null
			for (var i = 0; i < chats.length; i++) {
				let index = chats[i].members.findIndex(x => x.id === Number(chatMember))

				if (index >= 0 && !chatId) {
					chatId = chats[i].id
				}
			}

			if (!chatId) {
				const chatData = {
					membersChat: [chatMember],
				}
				chatId = await createChat(chatData, token)
			}

			dispatch(fetchChats(userId))
			dispatch(setChatId(chatId))
			const updatedChat = await getChatMessages(chatId, token)
			dispatch(setMessages(updatedChat))
			handleCloseModal()
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
	const theme = createTheme({
		// custom theme
		typography: {
			fontFamily: 'Segoe UI, sans-serif',

			h3: {
				fontSize: '2.5rem',
				fontWeight: 700,
			},
		},
	})
	return (
		<ThemeProvider theme={theme}>
			<Box>
				<Modal open={isOpen} onClose={() => handleCloseModal()}>
					<Box
						sx={{
							position: 'absolute',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'flex-start',
							alignItems: 'center',
							width: '60%',
							p: 1,
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							height: '52vh',
							bgcolor: 'white',
							boxShadow: 24,
							borderRadius: '7px',
							// '@media (max-width: 600px)': {
							// 	width: '100%',
							// 	height: '100%',
							// 	maxHeight: '100vh',
							// 	borderRadius: '0px',
							// },
						}}
					>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-around',
								alignItems: 'center',
								width: '100%',
								mb: 1,
							}}
						>
							<Box
								onClick={() => handleCloseModal()}
								sx={{
									cursor: 'pointer',
								}}
							>
								&#10005;
							</Box>
							<Typography>New Chat</Typography>
							{<Chats /> && <Button onClick={() => sendChat()}>next</Button>}
						</Box>
						<Box
							sx={{
								width: '100%',
							}}
						>
							<TextField
								onChange={findUsers}
								sx={{ width: '100%', mb: 2.5 }}
								label='Search People by @Tag'
							></TextField>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'flex-start',
									gap: 2,
									p: 2,
									margin: '0 auto',
									height: '65%',
									width: '50%',
									maxHeight: '55%',
									overflow: 'scroll',
									border: users.length && '2px solid rgb(19, 151, 232)',
									borderRadius: '2rem',
									'&::-webkit-scrollbar': {
										width: '0',
									},
								}}
							>
								{users &&
									users?.map(user => (
										<ModalForm key={user.id} user={user} sendChat={sendChat} />
									))}
							</Box>
						</Box>
					</Box>
				</Modal>
			</Box>
		</ThemeProvider>
	)
}

export default ModalNewChat
