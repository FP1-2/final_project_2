import React from 'react'
import PropTypes from 'prop-types'
import { Box, Avatar, Typography } from '@mui/material'
import { formatDistanceToNow, addHours } from 'date-fns'
import AdaptiveAvatar from '../AdaptiveAvatar/AdaptiveAvatar'

function MessageItem({ message }) {
	return (
		<Box
			sx={{
				px: 1,
				py: 1.5,
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					mb: 1,
				}}
			>
				<AdaptiveAvatar
					src={message.user.avatar}
					firstName={message.user.username}
					border={false}
					size={'2rem'}
					font='1rem'
				/>
				<Typography
					sx={{
						fontSize: '12px',
						opacity: 0.4,
					}}
				>
					{formatDistanceToNow(addHours(new Date(message.createdDate), 2))} ago
				</Typography>
			</Box>
			<Typography
				sx={{
					width: '98%',
					margin: '0 auto',
					wordWrap: 'break-word',
				}}
			>
				{message.text}
			</Typography>
		</Box>
	)
}
MessageItem.propTypes = {
	message: PropTypes.object,
}

export default MessageItem
