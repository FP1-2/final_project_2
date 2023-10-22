import React from 'react'
import { Box, Typography } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'

const PostsTypeVariant = ({ text, isChosen = false, setisChosen, index }) => {
	const theme = createTheme({
		typography: {
			p: {
				fontWeight: isChosen ? '700' : '400',
				fontFamily: 'Segoe UI, sans-serif',
			},
		},
	})
	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					height: '2.2rem',
					borderBottom: isChosen ? '4px solid #1DA1F2' : '',
					cursor: 'pointer',
				}}
				onClick={() => setisChosen(index)}
			>
				<Typography variant='p'>{text}</Typography>
			</Box>
		</ThemeProvider>
	)
}

PostsTypeVariant.propTypes = {
	text: PropTypes.string.isRequired,
	isChosen: PropTypes.bool,
	setisChosen: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
}

export default PostsTypeVariant
