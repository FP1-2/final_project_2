import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, Typography } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import AdaptiveAvatar from '../AdaptiveAvatar/AdaptiveAvatar'
import useScreenSize from '../../hooks/useScreenSize'

function ChatMembers({ chatmembers, fetchMessages }) {
	const screenSize = useScreenSize()

	const lastMessage = chatmembers.lastMessage
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
		<>
			<ThemeProvider theme={theme}>
				{lastMessage && (
					<Box
						sx={{
							width: '95%',
							margin: '0 auto',
						}}
						key={chatmembers.id}
					>
						<Box
							onClick={() => fetchMessages(chatmembers.id)}
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: 2,
								width: '100%',
								margin: '10px',
								p: 1,
								borderRadius: '0.7rem',
								cursor: 'pointer',
								background: 'rgba(0, 0, 0, 0.03)',

								'&:hover': {
									background: 'rgba(0, 0, 0, 0.08)',
								},
							}}
						>
							<AdaptiveAvatar
								src={lastMessage.user.avatar}
								firstName={lastMessage.user.username}
								border={false}
								size={'3.5rem'}
								font='2rem'
							/>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									width: '100%',
								}}
							>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
									}}
								>
									<Typography
										sx={{
											fontSize: '16px',
										}}
									>
										{lastMessage.user.firstName}
									</Typography>
									{screenSize !== 'tablet' && (
										<Typography
											sx={{
												fontSize: '12px',
												opacity: '0.3',
												mr: 1.2,
											}}
										>
											@{lastMessage.user.username}
										</Typography>
									)}
								</Box>
								<Typography
									sx={{
										width: '85%',
										textOverflow: 'ellipsis',
										overflow: 'hidden',
										whiteSpace: 'nowrap',
										fontSize: !lastMessage.text && '12px',
										textAlign: !lastMessage.text && 'center',
										opacity: !lastMessage.text && 0.6,
										fontWeight: !lastMessage.text && 700,
									}}
								>
									{lastMessage.text}
									{!lastMessage.text && 'Empty Dialog'}
								</Typography>
							</Box>
						</Box>
					</Box>
				)}
			</ThemeProvider>
		</>
	)
}
ChatMembers.propTypes = {
	chatmembers: PropTypes.object,
	fetchMessages: PropTypes.func,
}
export default ChatMembers
