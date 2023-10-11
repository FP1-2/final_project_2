import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Box, CssBaseline, ThemeProvider, Typography,Button } from '@mui/material'

import { createTheme } from '@mui/material/styles'

import Modal from '@mui/material/Modal';
import IconTwitter from '../IconTwitter/IconTwitter'
import { ErrorMessage, Form, Formik } from 'formik'
import CustomInput from '../../components/CustomInput/CustomInput'
import * as Yup from 'yup'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
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
const theme = createTheme({
	// custom theme
	typography: {
		h3: {
			fontSize: '2.5rem',
			fontWeight: 700,
		},
	},
})
const validationSchema = Yup.object({
		email: Yup.string()
			.email('invalid email address')
			.required('Email is required')
	})
	
const initialValues = {
	email: '',
	
}

function ModalResetPassword() {

    const dispatch = useDispatch();
    const [resetModal, setResetModal] = useState(true);


    const handleClose = () => {
		navigate('/signIn');
	}
	const navigate   = useNavigate();
	const onSubmit = async(values) => {
		try {
				  const response = await axios.post("https://basova.top/api/resetPasswords", values);
			  
				  if (response.status === 200) {
					setTimeout(() => {
					  navigate('/resetPassword/confirm');
					}, 1000);
				  }
				  resetForm();
			  
				  console.log('send', values);
				} catch (error) {
				  ErrorMessage('Error:', error);
				}
	}

	
		
  return (
	<ThemeProvider theme={theme}>
		<Modal
		open={resetModal}
		onClose={handleClose}
		>
	
		<Box sx={style}>
			<Box sx={{
				position: 'relative',
				}}>

						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
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
							<Box>
							Find your account in twitter
							</Box>
							<Box>
							To change your  email address associated with your account.
							</Box>
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
									<CustomInput
										name='email'
										type='text'
										label='Email'
										placeholder='Email address'
										autoComplete='email'
									/>
									
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
									
									>
										Reset
									</Button>
								</Form>
							)}
						</Formik>
						</Box>
				
			</Box>
		</Box>
		</Modal>
	</ThemeProvider>
  )
}

export default ModalResetPassword