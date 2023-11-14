import React, { useState } from 'react'
//MUI
import { Button, Box } from '@mui/material'
import ModalAddPost from '../ModalAddPost/ModalAddPost'

const TweetButton = () => {
	const [openModal, setOpenModal] = useState(false)

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Button
				sx={{
					width: '90%',
					py: 2,
					fontWeight: 800,
					backgroundColor: '#1D9BF0',
					borderRadius: 7,
				}}
				variant='contained'
				onClick={() => {setOpenModal(true)}}
			>
				Tweet
			</Button>
			<ModalAddPost open={openModal} setOpenModal={setOpenModal} />
		</Box>
	)
}

export default TweetButton
