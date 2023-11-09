import React from 'react'
//MUI
import { Button, Box } from '@mui/material'

const TweetButton = () => {
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
			>
				Tweet
			</Button>
		</Box>
	)
}

export default TweetButton
