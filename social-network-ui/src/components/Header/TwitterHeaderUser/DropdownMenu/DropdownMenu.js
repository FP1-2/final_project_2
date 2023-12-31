import React from 'react'
//MUI
import { Box, Typography } from '@mui/material'
//NPMs
import PropTypes from 'prop-types'

const DropdownMenu = ({ onLogout, username }) => {
	return (
		<Box
			sx={{
				position: 'absolute',
				width: '95%',
				py: 1.2,
				top: 0,
				left: '2.5%',
				transform: 'translateY(-120%)',
				borderRadius: 2,
				bgcolor: '#C0C0C0',
			}}
		>
			<Box
				onClick={onLogout}
				sx={{
					width: '90%',
					margin: '0 auto',
					py: 1,
					borderRadius: 2,
					textAlign: 'center',
					fontSize: '14px',
					cursor: 'pointer',
					transition: 'all 0.2s',
					textOverflow: 'ellipsis',
					overflow: 'hidden',
					whiteSpace: 'nowrap',

					'&:hover': {
						bgcolor: '#D3D3D3',
						color: '#42a5f5',
					},
				}}
			>
				<Typography
					variant='p'
					sx={{
						display: 'block',
						fontWeight: 'bold',
						mb: 1,
					}}
				>
					Log out
				</Typography>
				<Typography variant='p' sx={{}}>
					@{username}
				</Typography>
			</Box>
		</Box>
	)
}
DropdownMenu.propTypes = {
	onLogout: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
}
export default DropdownMenu
