import React, { useState, useRef, useEffect } from 'react'
//MUI
import { Box, Typography, CircularProgress, Modal } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { resetRegisterData } from '../../redux/slices/registerSlice'
import { closeModal } from '../../redux/slices/modalSignUpSlice'
//Components
import IconTwitter from '../IconTwitter/IconTwitter'
import ModalRegisterWindowFrstStep from './ModalRegisterWindowFrstStep/ModalRegisterWindowFrstStep'
import ModalRegisterWindowSecondStep from './ModalRegisterWindowSecondStep/ModalRegisterWindowSecondStep'
//NPMs
import { debounce } from 'lodash'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '47%',
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
		height: '100vh',
		pb: 0,
		pt: 2,
	},
}

const ModalRegisterWindow = () => {
	//states
	const [registerStep, setRegisterStep] = useState(1) // register step
	const [heightModalBelow, setHeightModalBelow] = useState(false)
	const [heightModalCountBelow, setHeightModalCountBelow] = useState(0)
	const [isRegisterDone, setIsRegisterDone] = useState(false) // register done status
	const [isLoading, setIsLoading] = useState(false)
	const [isOkayAlert, setIsOkayAlert] = useState(false)
	//redux
	const dispatch = useDispatch()
	const isModalOpen = useSelector(state => state.modalSignUp.modalProps.isOpen) // modal status
	//refs
	const modalHeight = useRef(null)

	const handleClose = () => {
		// close modal window
		dispatch(closeModal())
		setRegisterStep(1)
	}
	useEffect(() => {
		//set window height
		const handleResize = debounce(() => {
			const windowHeight = window.innerHeight
			if (windowHeight < 820) {
				setHeightModalBelow(true)
				setHeightModalCountBelow(windowHeight)
			} else {
				setHeightModalBelow(false)
				setHeightModalCountBelow(0)
			}
		}, 400)
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<Modal
			open={isModalOpen}
			onClose={() => {
				setIsLoading(false)
				dispatch(resetRegisterData())
				handleClose()
			}}
			sx={{
				overflow: 'scroll',
			}}
		>
			<Box ref={modalHeight} sx={[style]}>
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
								setIsOkayAlert={setIsOkayAlert}
							/>
						)
					) : (
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-evenly',
								alignItems: 'center',
								width: '100%',
								minHeight: '30vh',
								textAlign: 'center',
							}}
						>
							<CheckCircleIcon
								sx={{
									color: 'rgb(29, 161, 241)',
									fontSize: '9rem',
								}}
							/>
							<Typography
								sx={{
									fontSize: '15px',
									fontWeight: 600,
								}}
								variant='p'
							>
								Please activate your account using the verification code sent to
								your email.
							</Typography>
						</Box>
					)}
				</Box>
			</Box>
		</Modal>
	)
}

export default ModalRegisterWindow
