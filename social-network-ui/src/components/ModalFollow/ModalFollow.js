import React, { useEffect, useState } from 'react'
//MUI
import { Box, Modal, CircularProgress, Typography } from '@mui/material'
//Redux
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../../redux/slices/modalFollowSlice'
//API
import getUserFollowData from '../../api/getUserFollowData'
//Router
import { useParams } from 'react-router-dom'
//Custom Hooks
import UseUserToken from '../../hooks/useUserToken'
//Components
import ModalFollowList from './ModalFollowList/ModalFollowList'

const ModalFollow = () => {
	//redux state
	const isModalOpen = useSelector(state => state.modalFollow.modalProps.isOpen)
	const modalContent = useSelector(
		state => state.modalFollow.modalProps.modalContent
	)
	//state
	const [userFollowUsers, setUserFollowUsers] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	//redux
	const dispatch = useDispatch()
	//router
	const params = useParams()
	//custom hooks
	const { token } = UseUserToken()

	useEffect(() => {
		//load lists when open modal
		if (isModalOpen && modalContent) {
			;(async () => {
				setIsLoading(true)
				const data = await getUserFollowData(modalContent, params.userId, token)
				setUserFollowUsers(data)
				setIsLoading(false)
			})()
		}
	}, [isModalOpen])

	return (
		<Modal open={isModalOpen} onClose={() => dispatch(closeModal())}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'flex-start',
					height: '50%',
					width: '300px',
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					bgcolor: 'white',
					borderRadius: 2,
					p: 2,
					pb: 3,
					outline: 'none',
					overflow: 'auto',
				}}
			>
				{isLoading && <CircularProgress size={70} />}
				{!isLoading && userFollowUsers.length !== 0 && (
					<ModalFollowList followList={userFollowUsers} />
				)}
				{!isLoading && !userFollowUsers.length && (
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							height: '100%',
						}}
					>
						<Typography
							sx={{
								fontWeight: 700,
								fontSize: '22px',
								color: 'gray',
								opacity: 0.5,
								textTransform: 'capitalize',
							}}
						>
							{`	No ${modalContent} Available`}
						</Typography>
					</Box>
				)}
			</Box>
		</Modal>
	)
}

export default ModalFollow
