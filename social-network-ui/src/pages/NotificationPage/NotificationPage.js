import React, { useEffect, useState } from 'react'
//MUI
import { Box, Typography } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
//Components
import NotificationList from '../../components/NotificationList/NotificationList'
//APIs
import getUserNotifications from '../../api/getUserNotifications'
//Custom hooks
import UseUserToken from '../../hooks/useUserToken'
//WS
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'

const theme = createTheme({
	typography: {
		p: {
			fontFamily: 'Segoe UI, sans-serif',
		},
	},
})

const NotificationPage = () => {
	//states
	const [userNotifications, setUserNotifications] = useState([])
	const [page, setPage] = useState(0)
	const [isFull, setIsFull] = useState(false)
	// const [stompClient, setStompClient] = useState(null) //ws

	//custom hooks
	const { token } = UseUserToken()

	useEffect(() => {
		//get user notifys
		;(async () => {
			try {
				if (token) {
					const res = await getUserNotifications(token, page)
					if (res.length !== 10) {
						setIsFull(true)
					}

					const newArray = [...userNotifications, ...res]
					const sortedRes = newArray.sort((a, b) => {
						//sort user notifys active -> !active
						return a.active === b.active ? 0 : a.active ? -1 : 1
					})
					setUserNotifications([...newArray])
				}
			} catch (error) {
				console.log(error)
			}
		})()
	}, [page])

	// useEffect(() => {
	// 	const socket = new SockJS(
	// 		`${process.env.REACT_APP_SERVER_URL}`
	// 	)
	// 	const stomp = Stomp.over(socket)
	// 	setStompClient(stomp)

	// 	return () => {
	// 		if (stomp.connected) {
	// 			stomp.disconnect()
	// 		}
	// 	}
	// }, [])

	// useEffect(() => {
	// 	const subscribeToNotifications = () => {
	// 		if (stompClient) {
	// 			console.log(stompClient)
	// 			stompClient.connect({ Authorization: token }, () => {
	// 				stompClient.subscribe(
	// 					'/api/v1/notifications/all?page=1&size=10',
	// 					message => {
	// 						console.log(JSON.parse(message.body))
	// 						setUserNotifications(prevNotifications => [
	// 							...prevNotifications,
	// 							JSON.parse(message.body),
	// 						])
	// 					},
	// 					{ Authorization: token }
	// 				)
	// 			})
	// 		}
	// 	}

	// 	subscribeToNotifications()

	// 	return () => {
	// 		if (stompClient?.connected) {
	// 			stompClient.disconnect()
	// 		}
	// 	}
	// }, [stompClient, token])
	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					height: '100vh',
					width: '100%',
					overflow: 'scroll',
					'&::-webkit-scrollbar': {
						width: '0',
					},
				}}
			>
				<NotificationList notifications={userNotifications} />
				{!isFull && userNotifications.length !== 0 && (
					<Box
						sx={{
							position: 'relative',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							width: '100%',
							my: 4,
						}}
					>
						<Box
							sx={{
								width: '45%',
								height: '3px',
								bgcolor: '#1D9BF0',
								opacity: 0.5,
							}}
						></Box>
						<Typography
							variant='p'
							onClick={() => {
								setPage(prev => prev + 1)
							}}
							sx={{
								position: 'absolute',
								top: 0,
								width: '20%',
								bgcolor: 'white',
								color: '#A9A9A9',
								textAlign: 'center',
								transform: 'translateY(-40%)',
								cursor: 'pointer',
								fontWeight: '700',
								'&:hover': {
									color: '#1D9BF0',
								},
							}}
						>
							Load More
						</Typography>
					</Box>
				)}
				{isFull && (
					<Typography
						sx={{
							fontWeight: 700,
							fontSize: '36px',
							color: 'gray',
							opacity: 0.5,
							textAlign: 'center',
						}}
					>
						No Notifications Available
					</Typography>
				)}
			</Box>
		</ThemeProvider>
	)
}

export default NotificationPage
