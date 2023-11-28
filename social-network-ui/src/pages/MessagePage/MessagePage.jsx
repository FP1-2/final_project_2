import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Typography, CircularProgress } from '@mui/material'
import Chats from '../../components/Chats/Chats'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined'
import styles from './MessagePage.module.scss'
import Message from '../../components/Message/Message'
import ModalNewChat from '../../components/ModalNewChat/ModalNewChat'
import { openChatModal, setChats, setUsers } from '../../redux/slices/chatSlice'
import { fetchChats } from '../../redux/thunks/chatThunk'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { getAllUsers } from '../../api/getAllUsers'

function MessagePage() {
	const dispatch = useDispatch()
	const [username, setUsername] = useState('')
	const [user, setUser] = useState(null)
	const [err, setErr] = useState(false)
	const isOpen = useSelector(state => state.chat.modalProps.isOpenChat)
	const userId = useSelector(state => state.user?.userId)
	const messages = useSelector(state => state.chat.messages)
	const chats = useSelector(state => state.chat.chats)
	const chatsStorage = useSelector(state => state.chat.chatsStorage)
	const isLoading = useSelector(state => state.chat.isLoading)

	const handleOpenModal = () => {
		dispatch(openChatModal())
	}
	useEffect(() => {
		if (userId) {
			dispatch(fetchChats(userId))
		}
	}, [dispatch, userId])

	async function findChats(event) {
		const username = event.target.value
		const newChats = []
		for (let i = 0; i < chatsStorage.length; i++) {
			let index = chatsStorage[i].members.findIndex(
				x =>
					x.username.includes(username) ||
					x.firstName.includes(username) ||
					x.lastName.includes(username)
			)

			if (index >= 0) {
				newChats.push(chatsStorage[i])
			}
		}

		dispatch(setChats(newChats))
	}

	const theme = createTheme({
		typography: {
			p: {
				fontFamily: 'Segoe UI, sans-serif',
			},
			h3: {
				'@media (max-width: 450px)': {
					letterSpacing: '0.2rem',
				},
				'@media (max-width: 350px)': {
					letterSpacing: '0',
				},
			},
		},
	})
	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					zIndex: 1300,
					height: '100vh',
					overflow: 'scroll',
					'&::-webkit-scrollbar': {
						width: '0',
					},
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Typography
						variant='h2'
						sx={{
							px: 1,
							m: 3,
							textAlign: 'center',
							fontWeight: 700,
							fontSize: '46px',
							color: 'rgb(19, 151, 232)',
							opacity: 0.9,
							cursor: 'default',
						}}
					>
						Your Messages
					</Typography>
					{/* <div className={styles.flex}>
							<Typography
								variant='h2'
								sx={{
									marginBottom: '0.3rem',
									fontWeight: '700',
								}}
							>
								Messages
							</Typography>
							<span>
								{<SettingsOutlinedIcon fontSize='30px' />}
								{isOpen && <ModalNewChat />}
							</span>
							<span>
								{<MailOutlinedIcon fontSize='30px' onClick={handleOpenModal} />}
								{isOpen && <ModalNewChat />}
							</span>
						</div> */}
					{/*</div>*/}
					<Box
						sx={{
							width: '95%',
							px: 1,
							margin: '0 auto',
						}}
						className={styles.inputContainer}
					>
						<Box
							sx={{
								width: '50%',
								p: 3,
								fontWeight: 700,
								fontSize: '22px',
								borderRadius: '0.7rem',
								border: 'none',
								background: 'rgba(0, 0, 0, 0.03)',
								'@media (max-width: 1000px)': {
									px: 2,
								},
								'@media (max-width: 900px)': {
									px: 1,
								},
								'@media (max-width: 768px)': {
									px: 3,
								},
								'&:hover': {
									background: 'rgba(0, 0, 0, 0.08)',
								},
								'&::placeholder': {
									color: 'rgb(19, 151, 232)',
									opacity: 0.8,
									textAlign: 'center',
									'@media (max-width: 1300px)': {
										fontSize: '20px',
									},
									'@media (max-width: 1200px)': {
										fontSize: '18px',
									},
									'@media (max-width: 1100px)': {
										fontSize: '16px',
									},
									'@media (max-width: 1000px)': {
										fontSize: '14px',
									},
									'@media (max-width: 768px)': {
										fontSize: '22px',
									},
								},
							}}
							component='input'
							type='text'
							placeholder='Search Direct Messages'
							onChange={findChats}
						/>
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'flex-start',
							width: '50%',
							margin: '10px',
						}}
					>
						{chats.length !== 0 && <Chats />}
						{!isLoading && chats.length === 0 && (
							<Typography
								sx={{
									width: '95%',
									px: 1,
									mt: 10,
									textAlign: 'center',
									fontWeight: 700,
									fontSize: '36px',
									color: 'gray',
									opacity: 0.5,
								}}
							>
								No Messages Available
							</Typography>
						)}
						{isLoading && (
							<CircularProgress
								sx={{
									width: '100%',
									height: '100%',
									mt: 10,
								}}
								size='5rem'
							/>
						)}
					</Box>
					<Box
						sx={{
							width: '50%',
						}}
					>
						{messages !== null ? (
							<Message />
						) : (
							<Box
								sx={{
									height: '100%',
									fontSize: '1rem',
									fontWeight: 400,
								}}
							>
								<Box
									sx={{
										height: '100%',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										gap: 5,
									}}
								>
									<Box
										sx={{
											pt: 1,
											textAlign: 'center',
										}}
									>
										<Typography
											variant='h5'
											sx={{
												fontWeight: 700,
												mb: 1,
											}}
										>
											Select a message
										</Typography>
										<Typography
											sx={{
												width: '80%',
												margin: '0 auto',
												opacity: '0.4',
											}}
										>
											Choose from your existing conversations, start a new one,
											or just keep swimming.
										</Typography>
									</Box>
									{isOpen && <ModalNewChat />}
									<Button
										variant='contained'
										margin='normal'
										sx={{
											py: 2,
											px: 3,
											borderRadius: '2rem',
											fontSize: '1rem',
											fontWeight: 700,
											textTransform: 'none',
											backgroundColor: '#1DA1F2',
										}}
										onClick={handleOpenModal}
									>
										New Message
									</Button>
								</Box>
							</Box>
						)}
					</Box>
				</Box>
			</Box>
		</ThemeProvider>
	)
}

export default MessagePage
