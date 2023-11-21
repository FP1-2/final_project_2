import React, { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import MessageItem from './MessageItem'
import InputCreatMessage from '../InputCreateMessage/InputCreateMessage'
import { useState } from 'react'
import { Typography } from '@mui/material'

function Message() {
	const [messageArray, setMessageArray] = useState([])
	const [isEmpty, setIsEmpty] = useState(null)

	const messages = useSelector(state => state.chat.messages)
	const chatId = useSelector(state => state.chat.chatId)

	const scrollContainerRef = useRef(null)
	const lastMessageRef = useRef(null)

	useEffect(() => {
		if (messages.length) {
			const reversedMessages = [...messages].reverse()
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
				<InputCreatMessage chatId={chatId} />
			</Box>
		</>
	)
}

export default Message
