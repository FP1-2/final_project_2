import styled from '@emotion/styled'
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup,
	Typography,
} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { register } from '../../../redux/slices/registerSlice'
import CustomInput from '../../CustomInput/CustomInput'
import LinkText from '../../LinkText/LinkText'

const VisuallyHiddenInput = styled('input')`
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	height: 1px;
	overflow: hidden;
	position: absolute;
	bottom: 0;
	left: 0;
	white-space: nowrap;
	width: 1px;
`

const initialValues = {
	city: '',
	avatar: '',
	lastName: '',
	fstPassword: '',
	sndPassword: '',
}

const validationSchema = Yup.object({
	city: Yup.string()
		.required('Required')
		.min(3, 'City must be at least 4 characters'),
	avatar: Yup.string(),
	lastName: Yup.string()
		.required('Required')
		.min(3, 'Last name must be at least 4 characters'),
})
const validationSchemaAlt = Yup.object({
	fstPassword: Yup.string()
		.required('Required')
		.min(6, 'Password must be at least 6 characters'),
	sndPassword: Yup.string()
		.required('Required')
		.oneOf([Yup.ref('fstPassword'), null], 'Passwords must match'),
})

const ModalRegisterWindowSecondStep = ({
	setIsLoading,
	setRegisterStep,
	isModalOpen,
	handleClose,
}) => {
	const dispatch = useDispatch()

	const [dataProcessing, setDataProcessing] = useState(false) // data processing checkbox
	const [subscribeNewsletter, setSubscribeNewsletter] = useState(false) // subscribe news checkbox
	const [isCreatingPassword, setIsCreatingPassword] = useState(false) // creating password step

	const registerName = useSelector(state => state.register.registerData?.name) // register user name

	const handleDataProcessingChange = event => {
		// data processing checkbox
		setDataProcessing(event.target.checked)
	}

	const handleSubscribeNewsletterChange = event => {
		// subscribe news
		setSubscribeNewsletter(event.target.checked)
	}

	const onSubmit = (values, { resetForm }) => {
		if (!isCreatingPassword) {
			// road to creating password step
			setIsCreatingPassword(true)
			return
		}

		if (values.avatar === '') {
			values.avatar = false
		}

		const obj = {
			// add secod part of register data
			...values,
			dataProcessing: dataProcessing,
			subscribeNews: subscribeNewsletter,
			registerData: new Date().toUTCString(),
		}

		dispatch(register(obj))
		setIsLoading(true)
		resetForm()

		setTimeout(() => {
			setIsLoading(false)
			if (isModalOpen) {
				handleClose()
			}
		}, 1000)
	}
	return (
		<Box
			sx={{
				'@media (max-width: 600px)': {
					height: '80vh',
					pb: 10,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
				},
			}}
		>
			<Typography variant='h4' sx={{ mb: 2, fontWeight: '700' }}>
				Additional info
			</Typography>
			<Formik
				initialValues={initialValues}
				validationSchema={
					isCreatingPassword ? validationSchemaAlt : validationSchema
				}
				onSubmit={onSubmit}
			>
				{({ isValid, isSubmitting }) => (
					<Form
						style={{
							width: '100%',
						}}
					>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Avatar
								sx={{
									bgcolor: 'rgb(29, 161, 241)',
									p: 5,
									fontSize: '3rem',
									mb: 1,
								}}
							>
								{registerName?.charAt(0).toUpperCase()}
							</Avatar>
							<Button
								component='label'
								variant='contained'
								href='#file-upload'
								sx={{
									bgcolor: 'rgb(29, 161, 241)',
									borderRadius: '2rem',
									mb: 4,
								}}
							>
								Upload Avatar
								<VisuallyHiddenInput type='file' />
							</Button>
						</Box>
						{isCreatingPassword ? (
							<>
								<CustomInput
									name='fstPassword'
									type='password'
									label='Password'
									placeholder='Your Password'
									autoComplete='off'
								/>
								<CustomInput
									name='sndPassword'
									type='password'
									label='Confirm Password'
									placeholder='Confirm Password'
									autoComplete='off'
								/>
							</>
						) : (
							<>
								<CustomInput
									name='lastName'
									type='text'
									label='Last name'
									placeholder='Your Last Name'
									autoComplete='off'
								/>
								<CustomInput
									name='city'
									type='text'
									label='city'
									placeholder='Your City'
									autoComplete='off'
								/>
							</>
						)}

						<Box
							sx={{
								mb: 2,
							}}
						>
							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											checked={dataProcessing}
											onChange={handleDataProcessingChange}
											name='dataProcessing'
											color='primary'
											required
										/>
									}
									label={
										<span>
											I agree to the {<LinkText text='privacy policy' />} and
											consent to the processing of my personal data.
										</span>
									}
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={subscribeNewsletter}
											onChange={handleSubscribeNewsletterChange}
											name='subscribeNewsletter'
											color='primary'
										/>
									}
									label='I want to receive information about news and special offers via email.'
								/>
							</FormGroup>
						</Box>

						<Button
							type='submit'
							variant='contained'
							fullWidth
							margin='normal'
							sx={{
								marginBottom: '1.3rem',
								padding: '1.1rem 0',
								borderRadius: '2rem',
								fontSize: '1rem',
								fontWeight: 700,
								textTransform: 'none',
								backgroundColor: '#1DA1F2',
							}}
							disabled={!isValid || !dataProcessing}
						>
							{isCreatingPassword ? 'Create Account' : 'Set Password'}
						</Button>
					</Form>
				)}
			</Formik>
		</Box>
	)
}

ModalRegisterWindowSecondStep.propTypes = {
	setIsLoading: PropTypes.func.isRequired,
	setRegisterStep: PropTypes.func.isRequired,
	handleClose: PropTypes.func.isRequired,
	isModalOpen: PropTypes.bool.isRequired,
}

export default ModalRegisterWindowSecondStep
