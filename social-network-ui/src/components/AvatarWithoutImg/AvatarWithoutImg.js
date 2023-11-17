import React from 'react'
//MUI
import Avatar from '@mui/material/Avatar'
//NPMs
import PropTypes from 'prop-types'

const AvatarWithoutImg = ({ userName, border, big }) => {
	return (
		<Avatar
			sx={{
				width: big ? '4.5rem' : '2.5rem',
				height: big ? '4.5rem' : '2.5rem',
				bgcolor: 'rgb(29, 161, 241)',
				p: 5,
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
	big: PropTypes.bool,
}

AvatarWithoutImg.defaultProps = {
	border: false,
	big: false,
}

export default AvatarWithoutImg
