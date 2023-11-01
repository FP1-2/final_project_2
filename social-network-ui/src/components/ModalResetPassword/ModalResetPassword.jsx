import * as React from 'react'
import { Box, Typography } from '@mui/material'
import Modal from '@mui/material/Modal'
import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ModalResetEmail from "./ModalResetEmail/ModalResetEmail";
import {closeResetModal} from "../../redux/slices/modalResetSlice";
import ModalConfirm from "./ModalConfirm/ModalConfirm";


const ModalResetPassword = () => {
	const dispatch = useDispatch()

	const [isEmailSend, setIsEmailSend] = useState(0)
	const isModalOpen = useSelector(state => state.modalReset.modalProps.isOpenReset)

	const handleClose = () => {
		dispatch(closeResetModal())
	}

	return (
		<Modal
			open={isModalOpen}
			onClose={() => {
				handleClose()
			}}
			sx={{
				overflow: 'scroll',
			}}
		>
				<Box
					sx={{
						position: 'relative',
					}}
				>

					{ !isEmailSend ? (
						<>
							<ModalResetEmail
							setIsEmailSend={setIsEmailSend}
							/>
						</>

					) : (
						<ModalConfirm
						setIsEmailSend={setIsEmailSend}
						/>
					) }

				</Box>
		</Modal>
	)
}

export default ModalResetPassword