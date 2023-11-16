import React, { useState } from 'react'
// Components
import CustomInput from '../../components/CustomInput/CustomInput'
import IconTwitter from '../../components/IconTwitter/IconTwitter'
import LinkText from '../../components/LinkText/LinkText'
import ModalResetPassword from '../../components/ModalResetPassword/ModalResetPassword'
//Custom Hooks
import useUserToken from '../../hooks/useUserToken'
// API
import { postLoginData } from '../../api/authApi'
//Router
import { useNavigate } from 'react-router-dom'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/slices/userSlice'
import { openResetModal } from '../../redux/slices/modalResetSlice'
// MUI
import {
	Box,
	Button,
	CssBaseline,
	ThemeProvider,
	Typography,
} from '@mui/material'
import { createTheme } from '@mui/material/styles'
//Forms
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

const theme = createTheme({
	// custom theme
	typography: {
		h3: {
			fontSize: '2.5rem',
			fontWeight: 700,
		},
	},
})

//validation schema
const validationSchema = Yup.object({
	email: Yup.string()
		.email('invalid email address')
		.required('Email is required'),
	password: Yup.string()
		.required('Password is required')
		.min(6, 'Password is too short'),
})
//init value login form
const initialValues = {
	email: '',
	password: '',
}

const LoginPage = () => {
	//states
	const [loginError, setLoginError] = useState('')
	//Custom hooks
	const { token, saveToken, removeToken } = useUserToken()
	//router
	const navigate = useNavigate()
	//redux
	const dispatch = useDispatch()
	//redux state
	const isModalOpen = useSelector(
		state => state.modalReset.modalProps.isOpenReset
	)

	const handleResetModalOpen = () => {
		//close reset pass modal
		dispatch(openResetModal())
	}

	const onSubmit = async (values, { resetForm }) => {
		//submit handler
		try {
			const data = await postLoginData(values)
			if (data.error === null) {
				removeToken()
				saveToken(data.token)
				dispatch(login(data.id))
				resetForm()
				navigate(`/home`)
			} else {
				setLoginError('Invalid email or password. Please try again.')
			}
		} catch (error) {
			console.error(data.error)
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<CssBaseline />
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
						width: '30%',
						my: 12,
						'@media (max-width: 1280px)': {
							width: '40%',
						},
						'@media (max-width: 860px)': {
							width: '50%',
						},
						'@media (max-width: 600px)': {
							width: '80%',
						},
					}}
				>
					<IconTwitter />
					<Typography
						variant='h3'
						noWrap={true}
						sx={{
							marginBottom: '2rem',
						}}
					>
						Log in to Twitter
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
									position: 'relative',
								}}
							>
								<CustomInput
									name='email'
									type='text'
									label='Email'
									placeholder='Email address'
									autoComplete='email'
									onClick={() => setLoginError('')}
								/>
								<CustomInput
									name='password'
									type='password'
									label='Password'
									placeholder='Password'
									autoComplete='current-password'
									onClick={() => setLoginError('')}
								/>
								{loginError && (
									<Typography
										variant='body2'
										color='error'
										sx={{
											marginBottom: '1rem',
											position: 'absolute',
											width: '100%',
											bot: 0,
											top: '60%',
											textAlign: 'center',
											whiteSpace: 'nowrap',
										}}
									>
										{loginError}
									</Typography>
								)}
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
									Log In
								</Button>
							</Form>
						)}
					</Formik>

					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							width: '100%',
						}}
					>
						<Button
							sx={{
								fontSize: '1rem',
								color: 'rgb(13, 118, 184)',
								textTransform: 'none',
								'&:hover': {
									background: 'transparent',
									color: 'rgb(7, 82, 128)',
									textDecoration: 'underline',
								},
							}}
							onClick={handleResetModalOpen}
						>
							Forgot password?
						</Button>
						{isModalOpen && <ModalResetPassword />}
						<LinkText text='Sign up to Twitter' />
					</Box>
				</Box>
			</Box>
		</ThemeProvider>
	)
}

export default LoginPage
