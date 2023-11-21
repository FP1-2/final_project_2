import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Avatar, Typography } from '@mui/material'
import { formatDistanceToNow, addHours } from 'date-fns'
import AdaptiveAvatar from '../AdaptiveAvatar/AdaptiveAvatar'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

function MessageItem({ message }) {
	const [isYou, setIsYou] = useState(null)
	const localId = useSelector(state => state.user.userId)
	useEffect(() => {
		if (Number(localId) && Number(localId) === message.user.id) {
			setIsYou(true)
		} else {
			setIsYou(false)
		}
	}, [localId])

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
				<Box
					component={isYou ? 'div' : Link}
					to={`/profile/${message.user.id}`}
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 1,
						textDecoration: 'none',
						color: 'black',
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
							fontSize: isYou ? '16px' : '14px',
							fontWeight: isYou && '700',
							color: isYou && 'rgb(19, 151, 232)',
							cursor: isYou && 'default',
						}}
					>
						{isYou && isYou ? 'You' : `@${message.user.username}`}
					</Typography>
				</Box>
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
