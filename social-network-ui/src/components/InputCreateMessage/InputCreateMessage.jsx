import React, { useState, useEffect } from 'react'
import { Box, Button, Input } from '@mui/material'
import { setMessages } from '../../redux/slices/chatSlice'
import { getChatMessages } from '../../api/getChatMessages'
import { createMessage } from '../../api/postCreateMessage'
import PropTypes from 'prop-types'
import UseUserToken from '../../hooks/useUserToken'
import { useDispatch } from 'react-redux'
import SendIcon from '@mui/icons-material/Send'
function InputCreatMessage({ chatId }) {
	const { token } = UseUserToken()
	const dispatch = useDispatch()
	const [inputText, setInputText] = useState('')

	async function sendMessage() {
		try {
			const messageData = {
				chatId: chatId,
				text: inputText,
			}

			await createMessage(messageData, token)

			const updatedMessages = await getChatMessages(chatId, token)
			dispatch(setMessages(updatedMessages))
			setInputText('')
		} catch (error) {
			if (error.response) {
				dispatch(
					setError(`Error ${error.response?.status}: ${error.response?.data}`)
				)
			} else if (error.request) {
				dispatch(setError('Error: no response'))
			} else {
				dispatch(setError(`Error: ${error?.message}`))
			}
		}
	}

	const handleChange = e => {
		setInputText(e.target.value)
	}

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				width: '100%',
				px: 2,
				py: 1,
				bgcolor: 'white',
			}}
		>
			<Box
				sx={{
					width: '75%',
				}}
				component={Input}
				name='text'
				type='text || file'
				label='enter your text message'
				placeholder='Enter Your Text Message'
				value={inputText}
				onChange={handleChange}
			/>

			<Box
				onClick={sendMessage}
				type='submit'
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					width: '40px',
					height: '40px',
					textTransform: 'none',
					backgroundColor: '#1DA1F2',
					borderRadius: '50%',
				}}
			>
				<SendIcon
					sx={{
						margin: '0 auto',
						ml: '11.5px',
						width: '20px',
						height: '20px',
						fill: 'white',
					}}
				/>
			</Box>
		</Box>
	)
}
InputCreatMessage.propTypes = {
	chatId: PropTypes.number,
}
export default InputCreatMessage
