import React from 'react'
//MUI
import Avatar from '@mui/material/Avatar'
//NPMs
import PropTypes from 'prop-types'

const AvatarWithoutImg = ({ userName, border, size }) => {
	return (
		<Avatar
			sx={{
				width: size,
				height: size,
				bgcolor: 'rgb(29, 161, 241)',
				fontSize: '3rem',
				border: border ? '3px solid white' : 'none',
				textDecoration: 'none',
				color: 'white',
			}}
		>
			{userName?.charAt(0).toUpperCase()}
		</Avatar>
	)
}

AvatarWithoutImg.propTypes = {
	userName: PropTypes.string.isRequired,
	border: PropTypes.bool,
	size: PropTypes.string,
}

AvatarWithoutImg.defaultProps = {
	border: false,
}

export default AvatarWithoutImg
