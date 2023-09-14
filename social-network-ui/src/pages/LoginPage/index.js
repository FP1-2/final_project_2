import React from 'react'
import { Box, CssBaseline, Typography } from '@mui/material'
import IconTwitter from '../../components/IconTwitter'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material'
import { Formik, Form, Field } from 'formik'
import Button from '@mui/material/Button'
import * as Yup from 'yup'
import CustomInput from '../../components/CustomInput'
import LinkText from '../../components/LinkText'

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
		.required('Email is required'),
	password: Yup.string()
		.required('Password is required')
		.min(6, 'Password is too short'),
})

const initialValues = {
	email: '',
	password: '',
}

const LoginPage = () => {
	const onSubmit = (values, { resetForm }) => {
		// submit handler
		console.log('send', values)
		resetForm()
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
								}}
							>
								<CustomInput
									name='email'
									type='text'
									label='Email'
									placeholder='Email address'
									autoComplete='email'
								/>
								<CustomInput
									name='password'
									type='password'
									label='Password'
									placeholder='Password'
									autoComplete='current-password'
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
						<LinkText text='Forgot password?' />
						<LinkText text='Sign up to Twitter' />
					</Box>
				</Box>
			</Box>
		</ThemeProvider>
	)
}

export default LoginPage