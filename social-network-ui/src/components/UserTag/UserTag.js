import React from 'react'
import { Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
	typography: {
		p: {
			fontFamily: 'Segoe UI, sans-serif',
		},
	},
})

const UserTag = ({ userTag }) => {
	return (
		<ThemeProvider theme={theme}>
			<Typography
				variant='p'
				sx={{
					fontSize: '0.9rem',
					opacity: '0.6',
					color: 'black',
				}}
			>
				@{userTag}
			</Typography>
		</ThemeProvider>
	)
}

UserTag.propTypes = {
	userTag: PropTypes.string.isRequired,
}

export default UserTag
