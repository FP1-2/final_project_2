import React from 'react'
import { Link } from 'react-router-dom'
import TwitterIcon from '@mui/icons-material/Twitter'
import { PropTypes } from 'prop-types'
import { Box } from '@mui/material'

const IconTwitter = ({ adaptive, notLink, link, md, stroke }) => {
	if (notLink)
		return (
			<Box onClick={notLink}>
				<TwitterIcon
					sx={{
						fontSize: '4rem',
						cursor: 'pointer',
						fill: 'rgb(19, 151, 232)',
						stroke: 'black',
						strokeWidth: stroke ? '1px' : '0',
						':hover': {
							fill: 'rgb(49, 116, 157)',
						},
					}}
				/>
			</Box>
		)
	return (
		<Link
			to={`/${link}`}
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
						fontSize: `${md ? '3rem' : '4rem'}`,
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
	link: PropTypes.string,
	md: PropTypes.bool,
	stroke: PropTypes.bool,
}

IconTwitter.defaultProps = {
	adaptive: false,
	notLink: null,
	link: '',
	md: false,
}

export default IconTwitter
