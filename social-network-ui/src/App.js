import AppRoutes from './AppRoutes'
import React, { useEffect } from 'react'
import ModalRegisterWindow from './components/ModalRegisterWindow/ModalRegisterWindow'
import useScreenSize from './hooks/useScreenSize'
import { useSelector, useDispatch } from 'react-redux'
import { login } from './redux/slices/userSlice'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/material'
import TwitterHeader from './components/Header/TwitterHeader'

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
				>
					<Grid
						sx={
							{
								// bgcolor: 'red',
							}
						}
						item
						xs={0}
						lg={1}
					>
						<Box></Box>
					</Grid>
					<Grid
						sx={
							{
								// bgcolor: 'green',
							}
						}
						item
						xs={0}
						md={3}
						lg={2}
					>
						{screenSize !== 'mobile' && <TwitterHeader />}
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
						lg={6}
						sx={{
							borderRight: '1px solid #C4C4C4',
							borderLeft: '1px solid #C4C4C4',
						}}
					>
						<AppRoutes />
					</Grid>
					<Grid
						sx={
							{
								// bgcolor: 'green',
							}
						}
						item
						xs={0}
						md={3}
						lg={2}
					>
						<Box></Box>
					</Grid>
					<Grid
						sx={
							{
								// bgcolor: 'red',
							}
						}
						item
						xs={0}
						lg={1}
					>
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

export default App
