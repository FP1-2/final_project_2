
import AppRoutes from './AppRoutes'
import React, { useEffect } from 'react'
import ModalRegisterWindow from './components/ModalRegisterWindow/ModalRegisterWindow'
import useScreenSize from './hooks/useScreenSize'
import { useSelector, useDispatch } from 'react-redux'
import { login } from './redux/slices/userSlice'
import PermanentDrawerLeft from './components/Header/header'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/material'

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
		<>
			{isAuth && isAuth ? (
				<Grid
					sx={{
						minHeight: '100vh',
					}}
					container
					spacing={1}
				>
					<Grid
						sx={{
							border: '1px solid black',
							borderBottom: 'none',
						}}
						xs={2}
					>
						<PermanentDrawerLeft />
					</Grid>
					<Grid xs={8}>
						<AppRoutes />
					</Grid>
					<Grid xs={2}>
						<Box></Box>
					</Grid>
				</Grid>
			) : (
				<>
					<AppRoutes />
					<ModalRegisterWindow />
				</>
			)}
		</>
	)

}

export default App;
