import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../redux/slices/modalSlice'
import CircularProgress from '@mui/material/CircularProgress'
import IconTwitter from '../IconTwitter'
import { useState } from 'react'
import { resetRegisterData } from '../../redux/slices/registerSlice'
import ModalRegisterWindowFrstStep from './ModalRegisterWindowFrstStep'
import ModalRegisterWindowSecondStep from './ModalRegisterWindowSecondStep'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '47%',
	minHeight: '50vh',
	bgcolor: 'background.paper',
	border: '1px solid #000',
	boxShadow: 24,
	borderRadius: '7px',
	p: 4.5,
	'@media (min-width: 1800px)': {
		width: '40%',
	},
	'@media (max-width: 1380px)': {
		width: '55%',
	},
	'@media (max-width: 1280px)': {
		width: '60%',
	},
	'@media (max-width: 1180px)': {
		width: '70%',
	},
	'@media (max-width: 960px)': {
		width: '80%',
	},
	'@media (max-width: 780px)': {
		width: '90%',
	},
	'@media (max-width: 600px)': {
		width: '100%',
		minHeight: '100vh',
	},
}

const ModalRegisterWindow = () => {
	const dispatch = useDispatch()

	const [isLoading, setIsLoading] = useState(false)
	const [registerStep, setRegisterStep] = useState(1)

	const isModalOpen = useSelector(state => state.modal.modalProps.isOpen) // modal status

	const modalContent = useSelector(state => state.modal.modalProps?.content)

	const handleClose = () => {
		// close modal window
		dispatch(closeModal())
		setRegisterStep(1)
	}

	return (
		<Modal
			open={isModalOpen}
			onClose={() => {
				setIsLoading(false)
				dispatch(resetRegisterData())
				handleClose()
			}}
		>
			<Box sx={style}>
				{modalContent !== null ? (
					<Box
						sx={{
							position: 'relative',
						}}
					>
						<Box
							sx={{
								position: 'absolute',
								top: '0',
								left: '0',
								padding: '0.5rem 1rem',
								borderRadius: '2rem',
								backgroundColor: 'rgb(29, 161, 241)',
								color: '#fff',
								fontWeight: '700',
								cursor: 'default',
							}}
						>
							{`Step ${registerStep} of 2`}
						</Box>

						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								width: '100%',
							}}
						>
							<IconTwitter
								style={{
									margin: '0 auto',
								}}
							/>
						</Box>
						{isLoading ? (
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									width: '100%',
									minHeight: '30vh',
								}}
							>
								<CircularProgress size='5rem' />
							</Box>
						) : registerStep === 1 ? (
							<ModalRegisterWindowFrstStep
								modalContent={modalContent}
								isModalOpen={isModalOpen}
								setIsLoading={setIsLoading}
								setRegisterStep={setRegisterStep}
							/>
						) : (
							<ModalRegisterWindowSecondStep
								setIsLoading={setIsLoading}
								setRegisterStep={setRegisterStep}
								handleClose={handleClose}
								isModalOpen={isModalOpen}
							/>
						)}
					</Box>
				) : (
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							width: '100%',
						}}
					>
						<CircularProgress />
					</Box>
				)}
			</Box>
		</Modal>
	)
}

export default ModalRegisterWindow
