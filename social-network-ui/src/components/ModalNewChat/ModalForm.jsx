import React from 'react'
import {
	Box,
	Checkbox,
	Modal,
	FormLabel,
	InputLabel,
	TextField,
	FormGroup,
	FormControlLabel,
	Button,
	Typography,
} from '@mui/material'
import PropTypes from 'prop-types'
import { addChatMember } from './../../redux/slices/chatSlice'
import { useDispatch, useSelector } from 'react-redux'
import AdaptiveAvatar from '../AdaptiveAvatar/AdaptiveAvatar'

function ModalForm({ user }) {
	const chatMember = useSelector(state => state.chat.newChatMembers)
	const dispatch = useDispatch()
	const handleEvent = event => {
		dispatch(addChatMember(event.target.value))
	}

	return (
		<div>
			<FormGroup>
				<FormControlLabel
					sx={{
						mb: 2,
					}}
					control={<Checkbox value={user.id} onChange={handleEvent} />}
					key={user.id}
					label={
						<>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									gap: 1,
									cursor: 'pointer',
								}}
							>
								<AdaptiveAvatar
									src={user.avatar}
									firstName={user.username}
									border={false}
									size={'2.5rem'}
									font='1.25rem'
								/>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<Typography
										sx={{
											opacity: 0.4,
										}}
									>
										@
									</Typography>
									<Typography
										sx={{
											fontWeight: '700',
										}}
									>
										{user.username}
									</Typography>
								</Box>
							</Box>
						</>
					}
				></FormControlLabel>
			</FormGroup>
		</div>
		// <>
		// 	<Box
		// 		onClick={e => handleEvent(e)}
		// 		sx={{
		// 			display: 'flex',
		// 			justifyContent: 'center',
		// 			alignItems: 'center',
		// 			gap: 1,
		// 			cursor: 'pointer',
		// 		}}
		// 	>
		// 		<AdaptiveAvatar
		// 			src={user.avatar}
		// 			firstName={user.username}
		// 			border={false}
		// 			size={'2.5rem'}
		// 			font='1.25rem'
		// 		/>
		// 		<Box
		// 			sx={{
		// 				display: 'flex',
		// 				justifyContent: 'center',
		// 				alignItems: 'center',
		// 			}}
		// 		>
		// 			<Typography
		// 				sx={{
		// 					opacity: 0.4,
		// 				}}
		// 			>
		// 				@
		// 			</Typography>
		// 			<Typography
		// 				sx={{
		// 					fontWeight: '700',
		// 				}}
		// 			>
		// 				{user.username}
		// 			</Typography>
		// 		</Box>
		// 	</Box>
		// </>
	)
}
ModalForm.propTypes = {
	user: PropTypes.object,
}

export default ModalForm
