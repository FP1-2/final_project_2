import React from 'react'
import { Link } from 'react-router-dom'
import TwitterIcon from '@mui/icons-material/Twitter'

const IconTwitter = () => {
	return (
		<Link
			to='/'
			style={{
				marginBottom: '2rem',
			}}
		>
			<TwitterIcon
				sx={{
					fontSize: '4rem',
					fill: 'rgb(29, 161, 242)',
					':hover': {
						fill: 'rgb(49, 116, 157)',
					},
				}}
			/>
		</Link>
	)
}

export default IconTwitter
