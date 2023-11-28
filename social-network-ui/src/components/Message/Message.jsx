import React, { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import MessageItem from './MessageItem'
import InputCreatMessage from '../InputCreateMessage/InputCreateMessage'
import { useState } from 'react'
import { Typography } from '@mui/material'
//WS
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import UseUserToken from '../../hooks/useUserToken'

function Message() {
	const [messageArray, setMessageArray] = useState([])
	const [isEmpty, setIsEmpty] = useState(null)
	const [stompClient, setStompClient] = useState(null)

	const messages = useSelector(state => state.chat.messages)
	const chatId = useSelector(state => state.chat.chatId)
	const userId = useSelector(state => state.user?.userId)

	const scrollContainerRef = useRef(null)
	const lastMessageRef = useRef(null)

	const { token } = UseUserToken()

	useEffect(() => {
		if (messages.length) {
			const reversedMessages = [...messages].reverse()
			setMessageArray(reversedMessages)
			setIsEmpty(false)
		} else {
			setMessageArray([])
			setIsEmpty(true)
		}
	}, [])

	useEffect(() => {
		if (lastMessageRef.current) {
			lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [messages, lastMessageRef.current])

	useEffect(() => {
		const socket = new SockJS(
			`${process.env.REACT_APP_SERVER_URL}/api/ws`
		)
		const stomp = Stomp.over(socket)
		setStompClient(stomp)

		return () => {
			if (stomp.connected) {
				stomp.disconnect()
			}
		}
	}, [chatId])

	useEffect(() => {
		const subscribeToMessages = () => {
			if (stompClient) {
				console.log('123')

				if (!stompClient.connected) {
					stompClient.connect({ Authorization: token }, () => {
						stompClient.subscribe(`/topic/user-messages/${userId}`, message => {
							const receivedMessage = JSON.parse(message.body)
							console.log(receivedMessage)
							setMessageArray(prevMessages => [
								...prevMessages,
								receivedMessage,
							])
						})
					})
				}
			}
		}

		subscribeToMessages()

		return () => {
			if (stompClient?.connected) {
				stompClient.disconnect()
			}
		}
	}, [stompClient, chatId, token])

	const handleSendMessage = async newMessage => {
		if (chatId && newMessage) {
			try {
				stompClient.send(
					'/app/chat',
					{ Authorization: token },
					JSON.stringify(newMessage)
				)
			} catch (error) {
				console.error(error)
			}
		}
	}

	return (
		<>
			<Box
				className='ref'
				sx={{
					position: 'relative',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					height: '72vh',
					overflowY: 'auto',
					'&::-webkit-scrollbar': {
						width: '0',
					},
				}}
			>
				<Box
					ref={scrollContainerRef}
					sx={{
						width: '100%',
					}}
				>
					{messageArray?.map((message, index) => (
						<div
							key={message.id}
							ref={index === messages.length - 1 ? lastMessageRef : null}
						>
							<MessageItem message={message} />
						</div>
					))}
					{isEmpty && (
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
							Empty Dialog
						</Typography>
					)}
				</Box>
			</Box>
			<Box
				sx={{
					height: '5vh',
					width: '100%',
					bottom: 0,
				}}
			>
				<InputCreatMessage
					chatId={chatId}
					handleSendMessage={handleSendMessage}
				/>
			</Box>
		</>
	)
}

export default Message
