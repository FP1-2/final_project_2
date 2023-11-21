import React, { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import MessageItem from './MessageItem'
import InputCreatMessage from '../InputCreateMessage/InputCreateMessage'
import { useState } from 'react'

function Message() {
	const [messageArray, setMessageArray] = useState([])

	const messages = useSelector(state => state.chat.messages)
	const chatId = useSelector(state => state.chat.chatId)

	const scrollContainerRef = useRef(null)
	const lastMessageRef = useRef(null)

	useEffect(() => {
		if (messages.length) {
			const reversedMessages = [...messages].reverse()
			setMessageArray(reversedMessages)
		}
	}, [messages])

	useEffect(() => {
		if (lastMessageRef.current) {
			lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [messages, lastMessageRef.current])
	return (
		<>
			<Box
				className='ref'
				sx={{
					position: 'relative',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					maxHeight: '80vh',
					mb: 5,
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
				</Box>
				<Box
					sx={{
						position: 'fixed',
						width: '24.927%',
						bottom: 0,
					}}
				>
					<InputCreatMessage chatId={chatId} />
				</Box>
			</Box>
		</>
	)
}

export default Message
