import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Modal from '@mui/material/Modal'
import * as React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetRegisterData } from '../../redux/slices/registerSlice'
import IconTwitter from '../IconTwitter/IconTwitter'
import ModalRegisterWindowFrstStep from './ModalRegisterWindowFrstStep/ModalRegisterWindowFrstStep'
import ModalRegisterWindowSecondStep from './ModalRegisterWindowSecondStep/ModalRegisterWindowSecondStep'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { closeModal } from '../../redux/slices/modalSlice'

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
	const [registerStep, setRegisterStep] = useState(1) // register step
	const [isRegisterDone, setIsRegisterDone] = useState(false) // register done status

	const isModalOpen = useSelector(state => state.modal.modalProps.isOpen) // modal status

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
					{!isRegisterDone ? (
						isLoading ? (
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
								setIsRegisterDone={setIsRegisterDone}
							/>
						)
					) : (
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								width: '100%',
								minHeight: '30vh',
							}}
						>
							<CheckCircleIcon
								sx={{
									color: 'rgb(29, 161, 241)',
									fontSize: '10rem',
								}}
							/>
						</Box>
					)}
				</Box>
			</Box>
		</Modal>
	)
}

export default ModalRegisterWindow
