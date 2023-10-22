import React from 'react'
import Avatar from '@mui/material/Avatar'
import PropTypes from 'prop-types'

const AvatarWithoutImg = ({ userName, border, big }) => {
	return (
		<Avatar
			sx={{
				width: big ? '8rem' : '6rem',
				height: big ? '8rem' : '6rem',
				bgcolor: 'rgb(29, 161, 241)',
				p: 5,
				fontSize: '3rem',
				mb: 1,
				border: border ? '3px solid white' : 'none',
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
