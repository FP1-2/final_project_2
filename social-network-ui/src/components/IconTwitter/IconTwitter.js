import React from 'react'
import { Link } from 'react-router-dom'
import TwitterIcon from '@mui/icons-material/Twitter'
import { PropTypes } from 'prop-types'
import { Box } from '@mui/material'

const IconTwitter = ({ adaptive, notLink }) => {
	if (notLink)
		return (
			<Box onClick={notLink}>
				<TwitterIcon
					sx={{
						fontSize: '4rem',
						cursor: 'pointer',
						fill: 'rgb(29, 161, 242)',
						':hover': {
							fill: 'rgb(49, 116, 157)',
						},
					}}
				/>
			</Box>
		)
	return (
		<Link
			to='/'
			style={{
				marginBottom: '2rem',
			}}
		>
			{adaptive ? (
				<TwitterIcon
					sx={{
						fontSize: '6rem',
						fill: 'rgb(29, 161, 242)',
						':hover': {
							fill: 'rgb(49, 116, 157)',
						},
					}}
				/>
			) : (
				<TwitterIcon
					sx={{
						fontSize: '4rem',
						fill: 'rgb(29, 161, 242)',
						':hover': {
							fill: 'rgb(49, 116, 157)',
						},
					}}
				/>
			)}
		</Link>
	)
}

IconTwitter.propTypes = {
	adaptive: PropTypes.bool,
	notLink: PropTypes.func,
}

IconTwitter.defaultProps = {
	adaptive: false,
	notLink: null,
}

export default IconTwitter
