import { Box } from '@mui/material'
import React from 'react'
import IconTwitter from '../IconTwitter/IconTwitter'

const AppSkeleton = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minWidth: '100vw',
				minHeight: '100vh',
			}}
		>
			<Box
				sx={{
					display: 'inline-block',
					pointerEvents: 'none',
					animation: 'flyAround 2.5s linear infinite',
					'@keyframes flyAround': {
						'0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
						'100%': {
							transform: 'rotate(360deg) translateX(100px) rotate(-360deg)',
						},
					},
				}}
			>
				<IconTwitter adaptive={true} />
			</Box>
		</Box>
	)
}

export default AppSkeleton
