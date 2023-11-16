import React, { useEffect, useState } from 'react'
//MUI
import { Box } from '@mui/material'
//Components
import NotificationList from '../../components/NotificationList/NotificationList'
//APIs
import getUserNotifications from '../../api/getUserNotifications'
//Custom hooks
import UseUserToken from '../../hooks/useUserToken'

const NotificationPage = () => {
	//states
	const [userNotifications, setUserNotifications] = useState([])
	//custom hooks
	const { token } = UseUserToken()

	useEffect(() => {
		//get user notifys
		;(async () => {
			if (token) {
				const res = await getUserNotifications(token)
				const sortedRes = res.sort((a, b) => {
					//sort user notifys active -> !active
					return a.active === b.active ? 0 : a.active ? -1 : 1
				})
				setUserNotifications(sortedRes)
			}
		})()
	}, [])
	return (
		<Box
			sx={{
				height: '100vh',
				width: '100%',
				overflow: 'scroll',
				'&::-webkit-scrollbar': {
					width: '0',
				},
			}}
		>
			<NotificationList notifications={userNotifications} />
		</Box>
	)
}

export default NotificationPage
