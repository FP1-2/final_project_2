import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LinkText from '../../components/LinkText/LinkText'
import { Box, CssBaseline, ThemeProvider, Typography,Button } from '@mui/material'

import { createTheme } from '@mui/material/styles'

import Modal from '@mui/material/Modal';
import IconTwitter from '../IconTwitter/IconTwitter'
import { Form, Formik } from 'formik'
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
	activationCode: Yup.string()
		.required('Activation code is required'),
	newPassword: Yup.string()
		.required('Password is required')
		.min(6, 'Password is too short'),
})

const initialValues = {
	activationCode: '',
	newPassword: ''
}

function ModalConfirm() {
 
    const [resetModal, setResetModal] = useState(true);



    const handleClose = () => {
		navigate('/signIn');
	
	}
	const navigate   = useNavigate();
	const onSubmit = (values) => {
		const {data} = axios.post('https://basova.top/api/confirm', values)
		.then(function(respons){console.log(respons.status);
			if(respons.status === 200){
			setTimeout(() => {
				navigate('/signIn');
			}, 2000);
			}
		})
		console.log('send', values)
	}
		
		
  return (
	<ThemeProvider theme={theme}>
		<Modal
		open={resetModal}
		onClose={handleClose}
		>
		<Box sx={style} >
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
								enter code email
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
									name='activationCode'
									type='text'
									label='Activation Code'
									placeholder='Code '
									
								/>
								<CustomInput
									name='newPassword'
									type='text'
									label='New Password'
									placeholder='New Password '
									
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
									disabled={!isValid || isSubmitting}
								>
									Reset
								</Button>
							</Form>
						)}
					</Formik>
					
						</Box>
						<Box
						sx={{
							display: 'flex',
							width: '100%',
							fontWeight: '400',
							fontSize: '1rem'
    						
						}}
					>
						<LinkText text=' Log in' link='/signIn' />
					</Box>
				
			</Box>
		</Box>
		</Modal>
	</ThemeProvider>
  )
}

export default ModalConfirm
