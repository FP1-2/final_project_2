import * as React from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Button from '@mui/material/Button'
import GoogleIcon from '@mui/icons-material/Google'
import AppleIcon from '@mui/icons-material/Apple'
import LinkText from '../../components/LinkText'
import IconTwitter from '../../components/IconTwitter'
import { useDispatch } from 'react-redux'
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

	const handleModalOpen = content => {
		// open modal window
		if (content) {
			return dispatch(openModal(content)) // open modal window with custom content
		}
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
							'url(https://s3-alpha-sig.figma.com/img/fc73/ba7a/f1e6944d750f97b53adecbabca7ffd40?Expires=1694995200&Signature=fVENpy2gXpJjkhjghjf5WW8eCMkInSPx89h3vi5Ansjo4MNI0xfzumjhZ86Jx8ntH3hpF8LucgiQVKsu9y~Vrl5iqBhNd-1NFryvnlN3WUT7OUs~TnSPHWB2D54w37ctxJ-0WjO9K5KUG4QEUql88Yr~RV6FmsSCXDeXK~NiP8RNqPBVjfcjxQVpHbTrhqJQdRPi6Zm-EfymS8~dDP~lalXAvjgUj8MvCdbgYb2wwlF85tvn7IP2LnjIT3fuURWBloGapwGbLIZygbB-zk7~B0qME6IXMKU-t5q4tnzkm9u3KhhTUiYF~0W4skCg0hD9a8V~jwX4ev-khcjuvL3GhQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4)',
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
								onClick={() =>
									handleModalOpen({
										header: 'Create an account',
										inputs: [
											{
												name: 'name',
												type: 'text',
												label: 'Name',
												placeholder: 'Your First Name',
												autoComplete: 'name',
											},
											{
												name: 'email',
												type: 'text',
												label: 'Email',
												placeholder: 'Your Email',
												autoComplete: 'email',
											},
										],
										mainInfo: {
											title: 'Date of birth',
											text: 'Facilisi sem pulvinar velit nunc, gravida scelerisque amet nibh sit. Quis bibendum ante phasellus metus, magna lacinia sed augue. Odio enim nascetur leo mauris vel eget. Pretium id ullamcorper blandit viverra dignissim eget tellus. Nibh mi massa in molestie a sit. Elit congue.',
										},
										buttton: {
											text: 'Next',
										},
									})
								}
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
