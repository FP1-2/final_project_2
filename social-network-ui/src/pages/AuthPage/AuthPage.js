import * as React from 'react'
// MUI
import { Button, Box, CssBaseline, Grid, Typography } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
// Icons
import AppleIcon from '@mui/icons-material/Apple'
import GoogleIcon from '@mui/icons-material/Google'
// Redux
import { useDispatch } from 'react-redux'
import { openModal } from './../../redux/slices/modalSignUpSlice'
// Components
import IconTwitter from '../../components/IconTwitter/IconTwitter'
import LinkText from '../../components/LinkText/LinkText'
// Custom Hooks
import UseUserToken from '../../hooks/useUserToken'

// bg img
const imageLink =
	'https://res.cloudinary.com/doenettec/image/upload/v1695565552/back-twitter_1_ysrqxd.png'

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
				fontSize: '2.5rem',
			},
		},
		h3: {
			marginBottom: '2.5rem',
			fontWeight: 700,
			'@media (max-width: 600px)': {
				fontSize: '2.8rem',
			},
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
					'@media (max-width: 600px)': {
						width: '85%',
					},
				},
			},
		},
	},
})

const AuthPage = () => {
	//Redux
	const dispatch = useDispatch()
	//custom hooks
	const { removeToken } = UseUserToken()

	const handleModalOpen = () => {
		// open register modal
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
						backgroundImage: `url(${imageLink})`,
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
						'@media (max-width: 600px)': {
							alignItems: 'flex-start',
						},
					}}
				>
					<Box
						sx={{
							my: 14,
							mx: 10,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
							'@media (max-width: 600px)': {
								mt: 10,
								mx: 3,
							},
						}}
					>
						<Box
							sx={{
								'@media (max-width: 600px)': {
									margin: '0 auto',
									mb: 2,
								},
							}}
						>
							<IconTwitter />
						</Box>

						<Typography
							sx={{
								'@media (max-width: 600px)': {
									margin: '0 auto',
									mb: 2,
								},
							}}
							variant='h1'
							noWrap={true}
						>
							Happening now
						</Typography>
						<Typography
							sx={{
								'@media (max-width: 600px)': {
									margin: '0 auto',
									mb: 2,
								},
							}}
							variant='h3'
							noWrap={true}
						>
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
								'@media (max-width: 600px)': {
									width: '95%',
									margin: '0 auto',
									marginBottom: '1rem',
									textAlign: 'center',
								},
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
								'@media (max-width: 600px)': {
									width: '100%',
									textAlign: 'center',
								},
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
