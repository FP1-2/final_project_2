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
import { debounce } from 'lodash'
import { getChatMessages } from '../../api/getChatMessages'

function Message() {
	const [messageArray, setMessageArray] = useState(null)
	const [isEmpty, setIsEmpty] = useState(null)
	const [stompClient, setStompClient] = useState(null)
	const [page, setPage] = useState(1)
	const [isFull, setIsFull] = useState(false)

	const messages = useSelector(state => state.chat.messages)
	const chatId = useSelector(state => state.chat.chatId)
	const userId = useSelector(state => state.user?.userId)

	const scrollContainerRef = useRef(null)
	const lastMessageRef = useRef(null)

	const { token } = UseUserToken()

	useEffect(() => {
		if (messages.length) {
			const reversedMessages = [...messages].sort((a, b) => {
				const dateA = new Date(a.createdDate)
				const dateB = new Date(b.createdDate)
				if (dateA < dateB) {
					return -1
				}
				if (dateA > dateB) {
					return 1
				}
				return 0
			})

			setMessageArray(reversedMessages)
			setIsEmpty(false)
		} else {
			setMessageArray([])
			setIsEmpty(true)
		}
	}, [messages])

	useEffect(() => {
		if (lastMessageRef.current) {
			lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [messages, lastMessageRef.current, messageArray])

	useEffect(() => {
		setIsFull(false)
		const socket = new SockJS(
			`${process.env.REACT_APP_SERVER_URL || ''}/api/ws`
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

	useEffect(() => {
		const handleWheel = debounce(() => {
			if (
				scrollContainerRef.current &&
				scrollContainerRef.current.scrollTop === 0 &&
				messages.length === 10
			) {
				setPage(prevPage => prevPage + 1)
			}
		}, 300)

		if (!isFull) {
			scrollContainerRef.current.addEventListener('wheel', handleWheel)
		} else {
			scrollContainerRef.current.removeEventListener('wheel', handleWheel)
		}

		return () => {
			handleWheel.cancel()
			scrollContainerRef.current.removeEventListener('wheel', handleWheel)
		}
	}, [messages, isFull])

	useEffect(() => {
		console.log(page)
		if (page !== 1) {
			;(async () => {
				const data = await getChatMessages(chatId, token, page)
				if (data.length !== 10) {
					console.log('111111')
					setIsFull(true)
				}
				const newMsg = data.sort((a, b) => {
					const dateA = new Date(a.createdDate)
					const dateB = new Date(b.createdDate)
					if (dateA < dateB) {
						return -1
					}
					if (dateA > dateB) {
						return 1
					}
					return 0
				})
				setMessageArray(prev => [...newMsg, ...prev])
			})()
		}
	}, [page])

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
							key={`${message.id}+${message.createdDate}`}
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
