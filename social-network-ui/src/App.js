import React, { useEffect } from 'react'
import ModalRegisterWindow from './components/ModalRegisterWindow/ModalRegisterWindow'
import useScreenSize from './hooks/useScreenSize'
import { useSelector, useDispatch } from 'react-redux'
import { login } from './redux/slices/userSlice'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/material'
import TwitterHeader from './components/Header/TwitterHeader'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import AppRoutes from './AppRoutes'

const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0, // Изменяем стандартное значение xs
			sm: 768, // Устанавливаем планшетный брейкпоинт на 768
			md: 1024,
			lg: 1200,
			xl: 1920,
		},
	},
})

function App() {
	const screenSize = useScreenSize()
	const dispatch = useDispatch()
	const isAuth = useSelector(state => state.user?.isAuthenticated)

	useEffect(() => {
		if (!isAuth && localStorage.getItem('userId')) {
			dispatch(login(localStorage.getItem('userId')))
		}
	}, [isAuth])

	useEffect(() => {
		console.log(screenSize)
	}, [screenSize])

	return (
		<ThemeProvider theme={theme}>
			{isAuth && isAuth ? (
				<Grid
					sx={{
						minHeight: '100vh',
					}}
					container
				>
					<Grid sx={{}} item xs={0} lg={1}>
						<Box></Box>
					</Grid>
					<Grid sx={{}} item xs={0} sm={3} md={3} lg={2}>
						{screenSize !== 'mobile' && <TwitterHeader />}
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
						md={6}
						lg={6}
						sx={{
							borderRight: '1px solid #C4C4C4',
							borderLeft: '1px solid #C4C4C4',
						}}
					>
						<AppRoutes />
					</Grid>
					<Grid sx={{}} item xs={0} sm={3} md={3} lg={2}>
						<Box></Box>
					</Grid>
					<Grid sx={{}} item xs={0} lg={1}>
						<Box></Box>
					</Grid>
				</Grid>
			) : (
				<>
					<AppRoutes />
					<ModalRegisterWindow />
				</>
			)}
		</ThemeProvider>
	)
}

export default App
