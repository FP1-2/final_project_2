import React from 'react'
import { Link } from 'react-router-dom'
import TwitterIcon from '@mui/icons-material/Twitter'
import { PropTypes } from 'prop-types'

const IconTwitter = ({ adaptive }) => {
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
}

IconTwitter.defaultProps = {
	adaptive: false,
}

export default IconTwitter
