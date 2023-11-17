import React, { useState, useEffect } from 'react'
//MUI
import { Box, Typography } from '@mui/material'
//router
import { Link } from 'react-router-dom'
//components
import AdaptiveAvatar from '../../AdaptiveAvatar/AdaptiveAvatar'
//APIs
import { markAsReadUserNotification } from '../../../api/getUserNotifications'
//Custom hooks
import useUserToken from '../../../hooks/useUserToken'
//NPMs
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

const NotificationListItem = ({ data }) => {
	//states
	const [timer, setTimer] = useState(null)
	const [distanceTime, setDistanceTime] = useState('')
	const [isActive, setIsActive] = useState(data.active)
	//custom hooks
	const { token } = useUserToken()
	//constants
	//--//get post/subscribe id from link
	const postId = data.link.split('/')

	const notificationTypes = {
		// types notifys
		FEATURED: `/post/${postId[postId.length - 1]}`,
		MESSAGE: '/messages',
		LIKE: `/post/${postId[postId.length - 1]}`,
		COMMENT: `/post/${postId[postId.length - 1]}`,
		SUBSCRIBER: `/profile/${postId[postId.length - 1]}`,
		REPOST: `/post/${postId[postId.length - 1]}`,
	}

	useEffect(() => {
		//get time distance
		const createdDate = new Date(data.createdDate)
		createdDate.setHours(createdDate.getHours() + 2)
		const formattedDistance = formatDistanceToNow(createdDate)
		setDistanceTime(formattedDistance)
	}, [])

	const handleMouseEnter = () => {
		//markAsRead if mouse enter 1 sec
		setTimer(
			setTimeout(() => {
				markAsReadUserNotification(data.id, token)
				setIsActive(false)
			}, 1000)
		)
	}

	const handleMouseLeave = () => {
		if (timer) {
			clearTimeout(timer)
			setTimer(null)
		}
	}

	useEffect(() => {
		return () => {
			if (timer) {
				clearTimeout(timer)
				setTimer(null)
			}
		}
	}, [timer])

	return (
		<Box
			onMouseEnter={isActive ? handleMouseEnter : () => {}}
			onMouseLeave={isActive ? handleMouseLeave : () => {}}
			onClick={
				isActive
					? () => {
							markAsReadUserNotification(data.id, token)
					  }
					: () => {}
			}
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				position: 'relative',
				width: '90%',
				bgcolor: isActive ? '#1D9BF0' : '#D3D3D3',
				py: 2,
				px: 1,
				borderRadius: 3,
				textDecoration: 'none',
			}}
			component={Link}
			to={notificationTypes[data.type]}
		>
			{isActive && (
				<Box
					sx={{
						position: 'absolute',
						width: '10px',
						height: '10px',
						right: 8,
						top: 10,
						borderRadius: '50%',
						bgcolor: 'white',
					}}
				></Box>
			)}
			{distanceTime && (
				<Typography
					variant='p'
					sx={{
						position: 'absolute',
						right: 8,
						bottom: 10,
						color: isActive ? 'white' : '#1D9BF0',
						fontWeight: 'bold',
						textTransform: 'capitalize',
						fontSize: '12px',
						opacity: 0.8,
					}}
				>
					{distanceTime}
				</Typography>
			)}
			<AdaptiveAvatar
				src={data.fromUser.avatar}
				firstName={data.fromUser.firstName}
				border={false}
				size={'4rem'}
			/>
			<Box
				sx={{
					display: 'flex',
					width: '80%',
					flexDirection: 'column',
				}}
			>
				<Box></Box>
				<Typography
					sx={{
						color: isActive ? 'white' : 'black',
						width: '100%',
						textOverflow: 'ellipsis',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
					}}
				>
					{data.text}
				</Typography>
			</Box>
		</Box>
	)
}

NotificationListItem.propTypes = {
	data: PropTypes.object,
}

export default NotificationListItem
