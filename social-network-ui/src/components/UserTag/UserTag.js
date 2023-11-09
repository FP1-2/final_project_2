import React from 'react'
//MUI
import { Typography, ThemeProvider, createTheme } from '@mui/material'
//NPMs
import PropTypes from 'prop-types'

const theme = createTheme({
	typography: {
		p: {
			fontFamily: 'Segoe UI, sans-serif',
		},
	},
})

const UserTag = ({ userTag, maxWidth }) => {
	return (
		<ThemeProvider theme={theme}>
			<Typography
				variant='p'
				sx={{
					width: maxWidth ? `${maxWidth}%` : '',
					fontSize: '0.9rem',
					opacity: '0.6',
					color: 'black',
					whiteSpace: 'nowrap',
					textOverflow: 'ellipsis',
				}}
			>
				@{userTag}
			</Typography>
		</ThemeProvider>
	)
}

UserTag.propTypes = {
	userTag: PropTypes.string.isRequired,
	maxWidth: PropTypes.string,
}

export default UserTag
