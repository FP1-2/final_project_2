import React from 'react'
//MUI
import { Avatar } from '@mui/material'
//Components
import AvatarWithoutImg from './../AvatarWithoutImg/AvatarWithoutImg'
//NPMs
import PropTypes from 'prop-types'

const AdaptiveAvatar = ({
	src,
	alt,
	firstName,
	size,
	border = true,
	font = '3rem',
}) => {
	if (src) {
		return (
			<Avatar
				sx={{
					width: size,
					height: size,
					border: border ? '1px solid white' : 'none',
				}}
				src={src}
				alt={alt}
			/>
		)
	} else {
		return (
			<AvatarWithoutImg
				border={border}
				userName={firstName}
				size={size}
				font={font}
			/>
		)
	}
}

AdaptiveAvatar.propTypes = {
	src: PropTypes.string,
	alt: PropTypes.string,
	firstName: PropTypes.string.isRequired,
	size: PropTypes.string,
	border: PropTypes.bool,
	font: PropTypes.string,
}

export default AdaptiveAvatar
