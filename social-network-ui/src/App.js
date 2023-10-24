
import AppRoutes from './AppRoutes'
import React, { useEffect } from 'react'
import ModalRegisterWindow from './components/ModalRegisterWindow/ModalRegisterWindow'
import useScreenSize from './hooks/useScreenSize'

function App() {
	const screenSize = useScreenSize()

	useEffect(() => {
		console.log(screenSize)
	}, [screenSize])
	return (
		<>
			<AppRoutes />
			<ModalRegisterWindow />
		</>
	)

}

export default App;
