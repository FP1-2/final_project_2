import React, { useEffect, useState } from 'react'
// Components
import ModalRegisterWindow from './components/ModalRegisterWindow/ModalRegisterWindow'
import TwitterHeader from './components/Header/TwitterHeader'
import IconTwitter from './components/IconTwitter/IconTwitter'
import TwitterHeaderMobileMenu from './components/Header/TwitterHeaderMobileMenu/TwitterHeaderMobileMenu'
import AppRoutes from './AppRoutes'
//Custom Hooks
import useScreenSize from './hooks/useScreenSize'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { login, setUserData } from './redux/slices/userSlice'
// MUI
import Grid from '@mui/material/Grid'
import { Box } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
// API
import getUserData from './api/getUserInfo'

const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 768,
			md: 1024,
			lg: 1200,
			xl: 1920,
		},
	},
})

function App() {
	//states
	const [appLoading, setAppLoading] = useState(true)
	const [userDataLoading, setUserDataLoading] = useState(false)
	const [mobileMenuIsActive, setMobileMenuIsActive] = useState(false)
	//custom hooks
	const screenSize = useScreenSize()
	//redux
	const dispatch = useDispatch()
	const isAuth = useSelector(state => state.user?.isAuthenticated)
	const userData = useSelector(state => state.user?.userData)

	useEffect(() => {
		//save userId && token after auth
		if (!isAuth && localStorage.getItem('userId')) {
			dispatch(login(localStorage.getItem('userId')))
		}
	}, [isAuth])

	useEffect(() => {
		if (mobileMenuIsActive && screenSize !== 'mobile') {
			setMobileMenuIsActive(false)
		}
	}, [screenSize])

	useEffect(() => {
		//get user data when app init
		const fetchData = async () => {
			try {
				if (
					localStorage.getItem('userToken') &&
					localStorage.getItem('userId')
				) {
					setUserDataLoading(true)
					const data = await getUserData(
						localStorage.getItem('userId'),
						localStorage.getItem('userToken')
					)
					dispatch(setUserData(data))
				}
			} catch (error) {
				console.error(error)
			} finally {
				setUserDataLoading(false)
				setAppLoading(false)
			}
		}

		if (userData === null) {
			//need to fix two times load data
			fetchData()
		}
	}, [dispatch, isAuth])

	if (appLoading) return <div>Loading</div> // need change to skeleton

	return (
		<ThemeProvider theme={theme}>
			{isAuth && !userDataLoading ? (
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
							position: 'relative',
						}}
					>
						{screenSize === 'mobile' && (
							<Box
								sx={{
									position: 'absolute',
									right: 10,
									transform: 'translateY(-5%)',
									zIndex: 100,
								}}
							>
								<IconTwitter
									userFill={true}
									stroke={true}
									notLink={() => setMobileMenuIsActive(prev => !prev)}
								/>
							</Box>
						)}
						{mobileMenuIsActive && (
							<TwitterHeaderMobileMenu onClose={setMobileMenuIsActive} />
						)}
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
