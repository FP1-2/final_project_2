import React, { useEffect, useState } from 'react'
import { Box, Modal, CircularProgress, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../../redux/slices/modalFollowSlice'
import getUserFollowData from '../../api/getUserFollowData'
import { useParams } from 'react-router-dom'
import UseUserToken from '../../hooks/useUserToken'
import ModalFollowList from './ModalFollowList/ModalFollowList'

const ModalFollow = () => {
	const isModalOpen = useSelector(state => state.modalFollow.modalProps.isOpen)
	const modalContent = useSelector(
		state => state.modalFollow.modalProps.modalContent
	)
	const [userFollowUsers, setUserFollowUsers] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	const dispatch = useDispatch()
	const params = useParams()
	const { token } = UseUserToken()

	useEffect(() => {
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
								fontSize: '24px',
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
