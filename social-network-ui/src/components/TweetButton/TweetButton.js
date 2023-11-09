import React from 'react'
import { Button } from '@mui/material'

const TweetButton = () => {
	return (
		<Button
			sx={{
				marginTop: '1rem',
				marginLeft: '1rem',
				paddingX: '50px',
				paddingY: '15px',
				fontWeight: 800,
				backgroundColor: '#1D9BF0',
				borderRadius: '25px',
			}}
			variant='contained'
		>
			Tweet
		</Button>
	)
}

export default TweetButton
