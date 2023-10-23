import AppRoutes from './AppRoutes'
import React, { useEffect } from 'react'
import ModalRegisterWindow from './components/ModalRegisterWindow/ModalRegisterWindow'
import useScreenSize from './hooks/useScreenSize'
import { useSelector, useDispatch } from 'react-redux'
import { login } from './redux/slices/userSlice'

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
				<>
					{/* <Header /> */}
					<AppRoutes />
					{/* <Footer /> */}
				</>
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
