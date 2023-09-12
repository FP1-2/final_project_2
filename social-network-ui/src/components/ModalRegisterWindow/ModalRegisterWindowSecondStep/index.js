import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import CustomInput from '../../CustomInput'
import LinkText from '../../LinkText'
import { useDispatch } from 'react-redux'
import { register } from '../../../redux/slices/registerSlice'
import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import { useSelector } from 'react-redux'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import PropTypes from 'prop-types'

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

const ModalRegisterWindowSecondStep = ({
	setIsLoading,
	setRegisterStep,
	isModalOpen,
	handleClose,
}) => {
	const dispatch = useDispatch()
	const [dataProcessing, setDataProcessing] = useState(false)
	const [subscribeNewsletter, setSubscribeNewsletter] = useState(false)

	const handleDataProcessingChange = event => {
		setDataProcessing(event.target.checked)
	}

	const handleSubscribeNewsletterChange = event => {
		setSubscribeNewsletter(event.target.checked)
	}
	const registerName = useSelector(state => state.register.registerData?.name)
	const onSubmit = (values, { resetForm }) => {
		if (values.avatar === '') {
			values.avatar = false
		}
		const obj = {
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
			setRegisterStep(prevStep => prevStep + 1)
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
				validationSchema={validationSchema}
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
							disabled={!isValid || isSubmitting || !dataProcessing}
						>
							Finish Registration
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
