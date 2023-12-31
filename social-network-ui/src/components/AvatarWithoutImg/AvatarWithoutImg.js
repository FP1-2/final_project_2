import React from 'react'
//MUI
import Avatar from '@mui/material/Avatar'
//NPMs
import PropTypes from 'prop-types'

const AvatarWithoutImg = ({ userName, border, size, font }) => {
	return (
		<Avatar
			sx={{
				width: size,
				height: size,
				bgcolor: 'rgb(29, 161, 241)',
				fontSize: font,
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
	font: PropTypes.string,
}

AvatarWithoutImg.defaultProps = {
	border: false,
}

export default AvatarWithoutImg
