import * as React from 'react'

import AppleIcon from '@mui/icons-material/Apple'
import GoogleIcon from '@mui/icons-material/Google'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import IconTwitter from '../../components/IconTwitter/IconTwitter'
import LinkText from '../../components/LinkText/LinkText'
import { openModal } from '../../redux/slices/modalSlice'

const customPalette = {
	// custom palette
	primary: {
		main: '#000',
		contrastText: '#fff',
	},
}

const theme = createTheme({
	// custom theme
	palette: customPalette,
	typography: {
		h1: {
			marginBottom: '2.5rem',
			fontSize: '4rem',
			fontWeight: 700,

			'@media (max-width: 960px)': {
				fontSize: '3.5rem',
			},
			'@media (max-width: 600px)': {
				fontSize: '3rem',
			},
		},
		h3: {
			marginBottom: '2.5rem',
			fontWeight: 700,
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					width: '100%',
					borderRadius: '2rem',
					padding: '0.8rem 1rem',
					fontWeight: 700,
					'@media (min-width: 1600px)': {
						width: '90%',
						marginRight: 'auto',
					},
				},
			},
		},
	},
})

const AuthPage = () => {
	const dispatch = useDispatch()

	const handleModalOpen = () => {
		// open modal window
		dispatch(openModal())
	}

	return (
		<ThemeProvider theme={theme}>
			<Grid container component='main' sx={{ height: '100vh' }}>
				<CssBaseline />
				<Grid
					item
					xs={false}
					sm={4}
					md={6}
					lg={7}
					sx={{
						backgroundImage:
							'url(https://res.cloudinary.com/doenettec/image/upload/v1695474153/back-twitter_1_sgpuvr.png)',
						backgroundRepeat: 'no-repeat',
						backgroundColor: t =>
							t.palette.mode === 'light'
								? t.palette.grey[50]
								: t.palette.grey[900],
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				></Grid>
				<Grid
					item
					xs={12}
					sm={8}
					md={6}
					lg={5}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Box
						sx={{
							my: 14,
							mx: 10,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
						}}
					>
						<IconTwitter />

						<Typography variant='h1' noWrap={true}>
							Happening now
						</Typography>
						<Typography variant='h3' noWrap={true}>
							Join Twitter today
						</Typography>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: '1rem',
								width: '100%',
								marginBottom: '3.5rem',
							}}
						>
							<Button
								variant='outlined'
								style={{
									borderColor: 'rgb(29, 161, 242)',
									textTransform: 'none',
								}}
								onClick={handleModalOpen}
								startIcon={
									<GoogleIcon
										sx={{
											fill: 'rgb(252, 152, 30)',
										}}
									/>
								}
							>
								Sign up with Google
							</Button>
							<Button
								onClick={handleModalOpen}
								variant='outlined'
								style={{
									borderColor: 'rgb(29, 161, 242)',
									textTransform: 'none',
								}}
								startIcon={
									<AppleIcon
										sx={{
											fill: 'black',
										}}
									/>
								}
							>
								Sign up with Apple
							</Button>
							<Button
								style={{
									borderColor: 'rgb(29, 161, 242)',
									textTransform: 'none',
								}}
								variant='outlined'
								onClick={handleModalOpen}
							>
								Sign up with phone or email
							</Button>
						</Box>
						<Typography
							sx={{
								width: '85%',
								fontSize: '1rem',
								marginBottom: '1rem',
							}}
						>
							By singing up you agree to the
							<LinkText text=' Terms of Service' /> and
							<LinkText text=' Privacy Policy' />, including
							<LinkText text=' Cookie Use' />.
						</Typography>
						<Typography
							sx={{
								fontSize: '1.15rem',
							}}
						>
							Already have an account?
							<LinkText text=' Log in' link='/signIn' />
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	)
}

export default AuthPage
